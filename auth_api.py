from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel
import hashlib
import secrets
from datetime import datetime, timedelta
import json
import base64
from hmac import new as hmac_new

# === App Setup ===
app = FastAPI()

# === Security Config ===
SECRET_KEY = secrets.token_hex(32)
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REVOKED_TOKENS = set()  # Simulated revoked tokens

# === Models ===
class UserCreate(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# === Mock Database ===
users_db = {}

# === Helper Functions ===
def create_hmac_signature(data: str, secret: str) -> str:
    """Create HMAC signature for the data"""
    return hmac_new(
        secret.encode(),
        data.encode(),
        hashlib.sha256
    ).hexdigest()

def create_token(data: dict) -> str:
    """Create a new token with HMAC signature"""
    # Add expiration time
    data["exp"] = (datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)).timestamp()
    
    # Convert data to JSON string
    payload = json.dumps(data, sort_keys=True)
    
    # Create base64 encoded payload
    encoded_payload = base64.b64encode(payload.encode()).decode()
    
    # Create signature
    signature = create_hmac_signature(encoded_payload, SECRET_KEY)
    
    # Combine payload and signature
    return f"{encoded_payload}.{signature}"

def verify_token(token: str) -> dict:
    """Verify token and return payload"""
    try:
        # Split token into payload and signature
        encoded_payload, signature = token.split('.')
        
        # Verify signature
        expected_signature = create_hmac_signature(encoded_payload, SECRET_KEY)
        if not secrets.compare_digest(signature, expected_signature):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token signature"
            )
        
        # Decode payload
        payload = json.loads(base64.b64decode(encoded_payload))
        
        # Check expiration
        if payload["exp"] < datetime.utcnow().timestamp():
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has expired"
            )
        
        # Check if token is revoked
        if token in REVOKED_TOKENS:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has been revoked"
            )
        
        return payload
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate token"
        )

def get_password_hash(password: str) -> str:
    """Create password hash"""
    return hashlib.sha256(password.encode()).hexdigest()

# === Security Dependencies ===
async def get_current_user(token: str = Depends(lambda x: x.headers.get("Authorization"))):
    """Dependency to get current user from token"""
    if not token or not token.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )
    
    token = token.split(" ")[1]
    payload = verify_token(token)
    
    username = payload.get("sub")
    if username not in users_db:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    
    return username

# === Routes ===
@app.post("/register", response_model=Token)
async def register(user: UserCreate):
    """Register a new user"""
    if user.username in users_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    
    # Store user with hashed password
    users_db[user.username] = get_password_hash(user.password)
    
    # Create access token
    token_data = {"sub": user.username}
    access_token = create_token(token_data)
    
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/login", response_model=Token)
async def login(user: UserLogin):
    """Login user and return token"""
    if user.username not in users_db or \
       users_db[user.username] != get_password_hash(user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    
    # Create access token
    token_data = {"sub": user.username}
    access_token = create_token(token_data)
    
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/logout")
async def logout(current_user: str = Depends(get_current_user)):
    """Logout user by revoking current token"""
    token = token = token.split(" ")[1]
    REVOKED_TOKENS.add(token)
    return {"message": "Successfully logged out"}

@app.get("/protected")
async def protected_route(current_user: str = Depends(get_current_user)):
    """Protected route example"""
    return {"message": f"Hello {current_user}! This is a protected route."}