from fastapi import FastAPI, Depends, HTTPException, status, Request, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from web3 import Web3
from dotenv import load_dotenv
import hashlib
import secrets
from datetime import datetime, timedelta
import json
import base64
from hmac import new as hmac_new
import os

# Load environment variables
load_dotenv()

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

# === Security Config ===
SECRET_KEY = secrets.token_hex(32)
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REVOKED_TOKENS = set()  # Set to store revoked tokens

# === Swap Config ===
INFURA_URL = os.getenv("INFURA_URL", "https://mainnet.infura.io/v3/your-infura-key")  # Fallback value

# Get the swap router address from environment variable
SWAP_ROUTER_ADDRESS = os.getenv("SWAP_ROUTERS", "0xf998Bab3e3E2C286cDEb74e85d4035a3d8Fd8608")  # Uniswap V2 Router
CONTRACT_ADDRESS = SWAP_ROUTER_ADDRESS  # Use the swap router address

# Print the contract address for debugging
print(f"Using Swap Router address: {SWAP_ROUTER_ADDRESS}")

CHAIN_ID = int(os.getenv("CHAIN_ID", "1"))
DEFAULT_GAS = int(os.getenv("DEFAULT_GAS", "300000"))
DEFAULT_GAS_PRICE = int(os.getenv("DEFAULT_GAS_PRICE", "40"))

# Token addresses - Using correct Sepolia testnet addresses
TOKEN_ADDRESSES = {
    "ETH": "0xAbd4293F3440A1EEFBbF2838B87C41F0620011E1",  # WETH on Sepolia
    "BTC": "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",  # WBTC on Sepolia
    "USDT": "0x7362c1e29584834d501353E684718e47329FCC53",  # USDT on Sepolia
    "USDC": "0x8267cF9254734C6Eb452a7bb9AAF97B392258b21"  # USDC on Sepolia
}

# Add testnet chain configuration
CHAIN_ID = int(os.getenv("CHAIN_ID", "11155111"))  # Sepolia testnet by default

# Initialize Web3 and contract
w3 = None
contract = None
try:
    # Import json for loading ABI
    import json
    import os
    
    w3 = Web3(Web3.HTTPProvider(INFURA_URL))
    if w3.is_connected():
        # Load ABI from file
        abi_path = os.path.join(os.path.dirname(__file__), 'abi', 'swap_abi.json')
        with open(abi_path, 'r') as abi_file:
            contract_abi = json.load(abi_file)
            print(f"ABI loaded successfully from {abi_path}")
        
        # Initialize contract with ABI from file and SWAP_ROUTERS address
        contract_address = Web3.to_checksum_address(SWAP_ROUTER_ADDRESS)
        contract = w3.eth.contract(address=contract_address, abi=contract_abi)
        print(f"Web3 and contract initialized successfully with ABI from file.")
        print(f"Using contract address: {contract_address}")
    else:
        print("Warning: Web3 is not connected. Using mock data for development.")
except Exception as e:
    print(f"Error initializing Web3: {e}. Using mock data for development.")

# Mock contract ABI for development
CONTRACT_ABI = [
    {
        "inputs": [
            {"internalType": "address", "name": "tokenIn", "type": "address"},
            {"internalType": "address", "name": "tokenOut", "type": "address"},
            {"internalType": "uint256", "name": "amountIn", "type": "uint256"},
            {"internalType": "uint256", "name": "amountOutMin", "type": "uint256"},
            {"internalType": "address", "name": "to", "type": "address"}
        ],
        "name": "swap",
        "outputs": [{"internalType": "uint256", "name": "amountOut", "type": "uint256"}],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

# Mock exchange rates for development
exchange_rates = {
    "ETH_BTC": 0.06,
    "BTC_ETH": 16.67,
    "ETH_USDT": 3000,
    "USDT_ETH": 0.00033,
    "ETH_USDC": 3000,
    "USDC_ETH": 0.00033,
    "BTC_USDT": 50000,
    "USDT_BTC": 0.00002,
    "BTC_USDC": 50000,
    "USDC_BTC": 0.00002,
    "USDT_USDC": 1,
    "USDC_USDT": 1
}

try:
    contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=CONTRACT_ABI)
except Exception as e:
    print(f"Error initializing contract: {e}. Using mock data for development.")
    contract = None

# === Request Models ===
# Auth Models
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

# Swap Models
class SwapRequest(BaseModel):
    tokenIn: str  # Token symbol (ETH, BTC, USDT, USDC)
    tokenOut: str  # Token symbol (ETH, BTC, USDT, USDC)
    amountIn: float
    amountOutMin: float = 0  # Default to 0 (no slippage protection)
    to: str = None  # If None, will use the wallet address from user profile

class QuoteRequest(BaseModel):
    tokenIn: str
    tokenOut: str
    amountIn: float

# === Fake DB ===
fake_users_db = {}

# === Helper Functions ===
def get_token_from_header(request: Request = None, authorization: str = Header(None)):
    if authorization and authorization.startswith("Bearer "):
        return authorization.replace("Bearer ", "")
    elif request and "authorization" in request.headers:
        auth = request.headers["authorization"]
        if auth and auth.startswith("Bearer "):
            return auth.replace("Bearer ", "")
    return None

def get_password_hash(password: str):
    salt = secrets.token_hex(16)
    iterations = 100000  # Adjust based on security needs
    hash_obj = hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), iterations)
    return f"{salt}${iterations}${hash_obj.hex()}"

def verify_password(password: str, stored_hash: str, salt: str, iterations: int):
    hash_obj = hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), iterations)
    return hash_obj.hex() == stored_hash

def create_access_token(data: dict, expires_minutes: int = ACCESS_TOKEN_EXPIRE_MINUTES):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_minutes)
    to_encode.update({"exp": expire.timestamp()})
    encoded_jwt = jwt_encode(to_encode, SECRET_KEY, ALGORITHM)
    return encoded_jwt

def jwt_encode(payload: dict, key: str, algorithm: str):
    # Create header
    header = {"alg": algorithm, "typ": "JWT"}
    
    # Encode header and payload
    header_b64 = base64.urlsafe_b64encode(json.dumps(header).encode()).decode().rstrip('=')
    payload_b64 = base64.urlsafe_b64encode(json.dumps(payload).encode()).decode().rstrip('=')
    
    # Create signature
    message = f"{header_b64}.{payload_b64}"
    signature = hmac_new(key.encode(), message.encode(), hashlib.sha256).digest()
    signature_b64 = base64.urlsafe_b64encode(signature).decode().rstrip('=')
    
    # Return complete JWT
    return f"{header_b64}.{payload_b64}.{signature_b64}"

def decode_jwt(token: str):
    try:
        # Split the token
        header_b64, payload_b64, signature_b64 = token.split('.')
        
        # Decode the payload
        payload_json = base64.urlsafe_b64decode(payload_b64 + '=' * (4 - len(payload_b64) % 4)).decode()
        payload = json.loads(payload_json)
        
        # Check expiration
        if 'exp' in payload and datetime.utcnow().timestamp() > payload['exp']:
            raise HTTPException(status_code=401, detail="Token has expired")
            
        return payload
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")

# === Auth Routes ===
@app.post("/register", response_model=Token)
async def register(user: UserCreate):
    if user.username in fake_users_db:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    # Hash the password
    hashed_password = get_password_hash(user.password)
    
    # Store the user
    fake_users_db[user.username] = {
        "username": user.username,
        "email": user.email,
        "hashed_password": hashed_password,
        "wallet_address": None
    }
    
    # Create access token
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/login", response_model=Token)
async def login(credentials: UserLogin):
    # Check if user exists
    if credentials.username not in fake_users_db:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    user = fake_users_db[credentials.username]
    
    # Extract salt and iterations from stored hash
    stored_hash_parts = user["hashed_password"].split('$')
    if len(stored_hash_parts) != 3:
        raise HTTPException(status_code=500, detail="Invalid password hash format")
    
    salt, iterations, stored_hash = stored_hash_parts
    
    # Verify password
    if not verify_password(credentials.password, stored_hash, salt, int(iterations)):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    # Create access token
    access_token = create_access_token(data={"sub": credentials.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/logout")
async def logout(token: str = Depends(get_token_from_header)):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    try:
        # Decode JWT to verify it's valid before revoking
        payload = decode_jwt(token)
        
        # Add token to revoked tokens set
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
        # Decode JWT and get username
        payload = decode_jwt(token)
        username = payload.get("sub")
        
        if not username:
            raise HTTPException(status_code=401, detail="Invalid token: missing username")
        
        if username not in fake_users_db:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Validate wallet address format (basic check)
        wallet_address = request.wallet_address.lower()
        if not wallet_address.startswith("0x") or len(wallet_address) != 42:
            raise HTTPException(status_code=400, detail="Invalid Ethereum wallet address format")
        
        # Update user's wallet address
        fake_users_db[username]["wallet_address"] = wallet_address
        
        return {
            "message": "Wallet connected successfully",
            "wallet_address": wallet_address
        }
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Error connecting wallet: {str(e)}")

@app.get("/profile")
async def profile(token: str = Depends(get_token_from_header)):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    if token in REVOKED_TOKENS:
        raise HTTPException(status_code=401, detail="Token revoked")
    
    try:
        # Decode JWT and get username
        payload = decode_jwt(token)
        username = payload.get("sub")
        
        if not username:
            raise HTTPException(status_code=401, detail="Invalid token: missing username")
        
        if username not in fake_users_db:
            raise HTTPException(status_code=404, detail="User not found")
        
        user = fake_users_db[username]
        
        # Return user profile without sensitive information
        return {
            "username": user["username"],
            "email": user["email"],
            "wallet_address": user["wallet_address"]
        }
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Error fetching profile: {str(e)}")

# === Swap Routes ===
@app.post("/swap")
async def build_swap_transaction(
    request: SwapRequest,
    token: str = Depends(get_token_from_header)
):
    # Validate authentication
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    if token in REVOKED_TOKENS:
        raise HTTPException(status_code=401, detail="Token revoked")

    try:
        # Decode JWT and get user info
        payload = decode_jwt(token)
        username = payload.get("sub")
        if not username:
            raise HTTPException(status_code=401, detail="Invalid token: missing username")
        
        # Get user from database
        if username not in fake_users_db:
            raise HTTPException(status_code=404, detail="User not found")
        
        user = fake_users_db[username]
        
        # If 'to' address is not provided, use the user's wallet address
        to_address = request.to if request.to else user["wallet_address"]
        if not to_address:
            raise HTTPException(status_code=400, detail="No wallet address provided and no wallet connected to user")
            
        # Convert the address to checksum format to avoid Web3.py errors
        try:
            if to_address and w3:
                to_address = w3.to_checksum_address(to_address)
                print(f"Converted to checksum address: {to_address}")
        except Exception as e:
            print(f"Error converting to checksum address: {e}")
            # If conversion fails, use the original address but log the error
        
        # Get token addresses
        token_in_address = TOKEN_ADDRESSES.get(request.tokenIn.upper())
        token_out_address = TOKEN_ADDRESSES.get(request.tokenOut.upper())
        
        if not token_in_address or not token_out_address:
            raise HTTPException(status_code=400, detail="Invalid token symbol")
        
        # Convert amount to Wei (assuming 18 decimals for simplicity)
        amount_in_wei = int(request.amountIn * 10**18)
        amount_out_min_wei = int(request.amountOutMin * 10**18)
        print('address of tokenin', token_in_address)
        print('address of tokenout', token_out_address)
        print('amount in wei', amount_in_wei)
        print('address of to ', to_address)
        
        # Build transaction
        if contract:
            try:
                # Make sure addresses are in checksum format
                token_in_address = w3.to_checksum_address(token_in_address)
                token_out_address = w3.to_checksum_address(token_out_address)
                to_address = w3.to_checksum_address(to_address)
                
                print(f"Using checksum addresses: {token_in_address}, {token_out_address}, {to_address}")
                
                # Get current timestamp for deadline (30 minutes from now)
                current_block = w3.eth.get_block('latest')
                deadline = current_block.timestamp + 1800
                print(f"Setting deadline to: {deadline}")
                
                # Using your custom contract's swap function
                print("Using custom swap function from your contract")
                
                # Call the swap function from your contract
                tx = contract.functions.swap(
                    token_in_address,
                    token_out_address,
                    amount_in_wei,
                    0,  # amountOutMin (set to 0 for now)
                    to_address
                ).build_transaction({
                    "chainId": CHAIN_ID,
                    "gas": DEFAULT_GAS,
                    "gasPrice": w3.to_wei(DEFAULT_GAS_PRICE, 'gwei'),
                    "value": 0,
                    "nonce": w3.eth.get_transaction_count(to_address)
                })
                
                print(f"Transaction built successfully: {tx}")
            except Exception as e:
                print(f"Error building transaction with contract: {e}")
                raise HTTPException(status_code=500, detail=f"Error building transaction with contract: {str(e)}")
            
            return {
                "transaction": {
                    "to": CONTRACT_ADDRESS,
                    "data": tx["data"].hex(),
                    "gas": hex(tx["gas"]),
                    "gasPrice": hex(tx["gasPrice"]),
                    "chainId": hex(tx["chainId"]),
                    "value": "0x0"
                }
            }
        else:
            # Always return a valid mock transaction for development
            # This ensures the frontend always gets a valid response even if Web3 is not connected
            print("Using mock transaction data")
            
            # Generate a deterministic mock transaction data based on the input parameters
            mock_data = f"0x{request.tokenIn}{request.tokenOut}{int(request.amountIn * 1000)}"
            mock_data = mock_data.ljust(66, '0')  # Ensure it's a valid length for a transaction data
            
            return {
                "transaction": {
                    "to": CONTRACT_ADDRESS,
                    "data": mock_data,
                    "gas": hex(DEFAULT_GAS),
                    "gasPrice": hex(w3.to_wei(DEFAULT_GAS_PRICE, 'gwei')),
                    "chainId": hex(CHAIN_ID),
                    "value": "0x0"
                }
            }
    except Exception as e:
        # Log the full error for debugging
        print(f"Error in build_swap_transaction: {str(e)}")
        
        # Provide more specific error messages based on the type of exception
        if "not connected" in str(e).lower():
            raise HTTPException(status_code=503, detail="Blockchain connection unavailable. Please try again later.")
        elif "address" in str(e).lower() or "wallet" in str(e).lower():
            raise HTTPException(status_code=400, detail="Invalid wallet address format. Please check your wallet connection.")
        elif "token" in str(e).lower():
            raise HTTPException(status_code=400, detail="Invalid token selection. Please choose different tokens.")
        elif "amount" in str(e).lower() or "value" in str(e).lower():
            raise HTTPException(status_code=400, detail="Invalid amount specified. Please check your input values.")
        else:
            raise HTTPException(status_code=500, detail=f"Error building transaction: {str(e)}")


@app.post("/quote")
async def get_swap_quote(
    request: QuoteRequest,
    token: str = Depends(get_token_from_header)
):
    # Validate authentication
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    if token in REVOKED_TOKENS:
        raise HTTPException(status_code=401, detail="Token revoked")

    try:
        # Decode JWT and get user info
        payload = decode_jwt(token)
        username = payload.get("sub")
        if not username:
            raise HTTPException(status_code=401, detail="Invalid token: missing username")
            
        # Get token addresses
        token_in_address = TOKEN_ADDRESSES.get(request.tokenIn.upper())
        token_out_address = TOKEN_ADDRESSES.get(request.tokenOut.upper())
        
        if not token_in_address or not token_out_address:
            raise HTTPException(status_code=400, detail="Invalid token symbol")
        
        # Use mock exchange rates for development
        pair_key = f"{request.tokenIn.upper()}_{request.tokenOut.upper()}"
        if pair_key in exchange_rates:
            rate = exchange_rates[pair_key]
            expected_output = request.amountIn * rate
            
            # Apply a mock slippage of 1%
            min_output = expected_output * 0.99
            
            return {
                "expectedOutput": expected_output,
                "minimumOutput": min_output,
                "priceImpact": "1.00%",
                "route": [request.tokenIn, request.tokenOut]
            }
        else:
            raise HTTPException(status_code=400, detail="Unsupported token pair")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting quote: {str(e)}")

@app.get("/tokens")
async def get_tokens(token: str = Depends(get_token_from_header)):
    # Validate authentication
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    if token in REVOKED_TOKENS:
        raise HTTPException(status_code=401, detail="Token revoked")

    try:
        # Decode JWT and get user info
        payload = decode_jwt(token)
        username = payload.get("sub")
        if not username:
            raise HTTPException(status_code=401, detail="Invalid token: missing username")
            
        return {
            "tokens": [
                {"symbol": "ETH", "name": "Ethereum", "address": TOKEN_ADDRESSES["ETH"]},
                {"symbol": "BTC", "name": "Bitcoin", "address": TOKEN_ADDRESSES["BTC"]},
                {"symbol": "USDT", "name": "Tether USD", "address": TOKEN_ADDRESSES["USDT"]},
                {"symbol": "USDC", "name": "USD Coin", "address": TOKEN_ADDRESSES["USDC"]}
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Authentication error: {str(e)}")

# === Health Check ===
@app.get("/health")
async def health_check():
    return {"status": "ok", "message": "Server is running"}

# === Exception Handlers ===
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
        headers={"Content-Type": "application/json"}
    )

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"detail": f"Internal server error: {str(exc)}"},
        headers={"Content-Type": "application/json"}
    )

# Add this import at the top of the file
from fastapi.responses import JSONResponse

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8002)
