from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel
import hashlib
import secrets
from datetime import datetime, timedelta
import json
import base64
from hmac import new as hmac_new
from fastapi.middleware.cors import CORSMiddleware

# === App Setup ===
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "ok", "message": "Server is running"}

# === Security Config ===
SECRET_KEY = secrets.token_hex(32)
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REVOKED_TOKENS = set()  # Simulated revoked tokens

# === Models ===
class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class WalletConnectRequest(BaseModel):
    wallet_address: str


# === Fake DB ===
fake_users_db = {}

# === Helper Functions ===


 
 
# Function to extract token from Authorization header
from fastapi import Header, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

# Optional security for more flexibility
security = HTTPBearer(auto_error=False)

# More flexible token extraction that works with various client implementations
async def get_token_from_header(request: Request = None, authorization: str = Header(None)):
    # First try to get from the request header directly
    if authorization and authorization.startswith('Bearer '):
        return authorization.replace('Bearer ', '')
    
    # Then try to get from the request object if available
    if request:
        auth_header = request.headers.get('Authorization')
        if auth_header and auth_header.startswith('Bearer '):
            return auth_header.replace('Bearer ', '')
    
    return None

def get_password_hash(password: str) -> tuple:
    salt = secrets.token_hex(16)
    iterations = 600000
    hash_bytes = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), iterations)
    return hash_bytes.hex(), salt, iterations

def verify_password(password: str, stored_hash: str, salt: str, iterations: int) -> bool:
    hash_to_check = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), iterations).hex()
    return secrets.compare_digest(hash_to_check, stored_hash)

def create_access_token(data: dict, expires_minutes: int = ACCESS_TOKEN_EXPIRE_MINUTES):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_minutes)
    to_encode.update({"exp": int(expire.timestamp())})  # Convert to timestamp
    encoded_jwt = jwt_encode(to_encode, SECRET_KEY, ALGORITHM)
    return encoded_jwt

def jwt_encode(payload: dict, key: str, algorithm: str) -> str:
    header = {"alg": algorithm, "typ": "JWT"}
    
    encoded_header = base64.urlsafe_b64encode(json.dumps(header, separators=(",", ":")).encode()).rstrip(b'=').decode()
    encoded_payload = base64.urlsafe_b64encode(json.dumps(payload, separators=(",", ":")).encode()).rstrip(b'=').decode()
    signature_input = f"{encoded_header}.{encoded_payload}".encode()

    if algorithm == "HS256":
        hash_func = hashlib.sha256
    elif algorithm == "HS384":
        hash_func = hashlib.sha384
    elif algorithm == "HS512":
        hash_func = hashlib.sha512
    else:
        raise ValueError(f"Unsupported signing algorithm: {algorithm}")

    sig = hmac_new(key.encode(), signature_input, hash_func).digest()
    encoded_signature = base64.urlsafe_b64encode(sig).rstrip(b'=').decode()

    return f"{encoded_header}.{encoded_payload}.{encoded_signature}"

def decode_jwt(token: str):
    try:
        header, payload, signature = token.split(".")
        decoded_payload = base64.urlsafe_b64decode(payload + "==").decode()
        return json.loads(decoded_payload)
    except Exception:
        raise HTTPException(status_code=403, detail="Invalid token")

# === Routes ===

@app.post("/register", response_model=Token)
async def register(user: UserCreate):
    if user.username in fake_users_db:
        raise HTTPException(status_code=400, detail="Username already taken")

    hashed_pw, salt, iters = get_password_hash(user.password)
    fake_users_db[user.username] = {
        "username": user.username,
        "email": user.email,
        "hashed_password": hashed_pw,
        "salt": salt,
        "iterations": iters,
        "wallet_address": None
    }

    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/login", response_model=Token)
async def login(credentials: UserLogin):
    user = fake_users_db.get(credentials.username)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect username or password")

    stored_hash = user["hashed_password"]
    salt = user["salt"]
    iterations = user["iterations"]

    if not verify_password(credentials.password, stored_hash, salt, iterations):
        raise HTTPException(status_code=401, detail="Incorrect username or password")

    access_token = create_access_token(data={"sub": credentials.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/logout")
async def logout(token: str = Depends(get_token_from_header)):
    if not token:
        raise HTTPException(status_code=401, detail="Missing authorization token")

    if token in REVOKED_TOKENS:
        raise HTTPException(status_code=400, detail="Already logged out")

    try:
        payload = decode_jwt(token)
        exp_time = datetime.utcfromtimestamp(payload["exp"])
        if datetime.utcnow() > exp_time:
            raise HTTPException(status_code=401, detail="Token has expired")

        REVOKED_TOKENS.add(token)
        return {"message": "Successfully logged out"}
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")

@app.post("/connect-wallet")
async def connect_wallet(
    request: WalletConnectRequest,
    token: str = Depends(get_token_from_header)
):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    if token in REVOKED_TOKENS:
        raise HTTPException(status_code=401, detail="Token revoked")

    try:
        payload = decode_jwt(token)
        username = payload.get("sub")
        if not username:
            raise HTTPException(status_code=401, detail="Invalid token: missing username")
            
        user = fake_users_db.get(username)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        wallet_address = request.wallet_address.strip().lower()
        if not wallet_address.startswith("0x") or len(wallet_address) != 42:
            raise HTTPException(status_code=400, detail="Invalid Ethereum wallet address")

        user["wallet_address"] = wallet_address
        return {"message": f"Wallet {wallet_address} connected successfully"}
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")

@app.get("/profile")
async def profile(token: str = Depends(get_token_from_header)):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    if token in REVOKED_TOKENS:
        raise HTTPException(status_code=401, detail="Token revoked")

    try:
        payload = decode_jwt(token)
        username = payload.get("sub")
        if not username:
            raise HTTPException(status_code=401, detail="Invalid token: missing username")
            
        user = fake_users_db.get(username)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        return {
            "username": user["username"],
            "email": user["email"],
            "wallet_address": user["wallet_address"]
        }
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")

@app.exception_handler(HTTPException)
def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
        headers={"Content-Type": "application/json"},
    )

@app.exception_handler(Exception)
def general_exception_handler(request, exc):
    # Log the error for server-side debugging
    print(f"Unhandled exception: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
        headers={"Content-Type": "application/json"},
    )