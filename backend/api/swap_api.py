from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from web3 import Web3
from dotenv import load_dotenv
import os
import json

# Import token extraction function from login_api
try:
    # Try relative import first (when imported as a module)
    from .login_api import get_token_from_header, decode_jwt, REVOKED_TOKENS
except ImportError:
    # Fall back to direct import (when run directly)
    from login_api import get_token_from_header, decode_jwt, REVOKED_TOKENS

# Load environment variables
load_dotenv()

# Configurations
INFURA_URL = os.getenv("INFURA_URL", "https://mainnet.infura.io/v3/your-infura-key")  # Fallback value
CONTRACT_ADDRESS = os.getenv("SWAP_ROUTERS", "0xf998Bab3e3E2C286cDEb74e85d4035a3d8Fd8608")  # Uniswap V2 Router
CHAIN_ID = int(os.getenv("CHAIN_ID", "1"))
DEFAULT_GAS = int(os.getenv("DEFAULT_GAS", "300000"))
DEFAULT_GAS_PRICE = int(os.getenv("DEFAULT_GAS_PRICE", "40"))

# Token addresses - For frontend dropdown options
TOKEN_ADDRESSES = {
    "ETH": "0xAbd4293F3440A1EEFBbF2838B87C41F0620011E1",  # WETH
    "BTC": "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",  # WBTC
    "USDT": "0x7362c1e29584834d501353E684718e47329FCC53",
    "USDC": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
}

# Initialize Web3
try:
    w3 = Web3(Web3.HTTPProvider(INFURA_URL))
    if not w3.is_connected():
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

# Create contract instance
try:
    contract = w3.eth.contract(address=Web3.to_checksum_address(CONTRACT_ADDRESS), abi=CONTRACT_ABI)
except Exception as e:
    print(f"Failed to initialize contract: {e}. Using mock implementation.")
    # Create a mock contract for development
    contract = None

# FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request models
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

# API endpoints
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
            
        # Get token addresses
        token_in_address = TOKEN_ADDRESSES.get(request.tokenIn.upper())
        token_out_address = TOKEN_ADDRESSES.get(request.tokenOut.upper())
        
        if not token_in_address or not token_out_address:
            raise HTTPException(status_code=400, detail="Invalid token symbol")
        
        # Convert amounts to wei (assuming 18 decimals for simplicity)
        amount_in_wei = int(request.amountIn * 10**18)
        amount_out_min_wei = int(request.amountOutMin * 10**18)
        
        # Use the provided 'to' address or the user's wallet address
        to_address = request.to
        if not to_address:
            # In a real implementation, you would get this from the user's profile
            raise HTTPException(status_code=400, detail="Recipient address is required")
        
        # Build the transaction (or use mock data if contract is not available)
        if contract:
            tx = contract.functions.swap(
                token_in_address,
                token_out_address,
                amount_in_wei,
                amount_out_min_wei,
                to_address
            ).build_transaction({
                "chainId": CHAIN_ID,
                "gas": DEFAULT_GAS,
                "gasPrice": w3.to_wei(DEFAULT_GAS_PRICE, 'gwei'),
                "value": 0,
            })
            
            # Return the transaction data
            return {
                "transaction": {
                    "to": tx["to"],
                    "data": tx["data"].hex(),
                    "value": tx["value"],
                    "gas": tx["gas"],
                    "gasPrice": tx["gasPrice"]
                },
                "summary": {
                    "tokenIn": request.tokenIn,
                    "tokenOut": request.tokenOut,
                    "amountIn": request.amountIn,
                    "amountOutMin": request.amountOutMin,
                    "to": to_address
                }
            }
        else:
            # Mock response for development
            return {
                "transaction": {
                    "to": CONTRACT_ADDRESS,
                    "data": "0x38ed1739...",  # Mock transaction data
                    "value": 0,
                    "gas": DEFAULT_GAS,
                    "gasPrice": w3.to_wei(DEFAULT_GAS_PRICE, 'gwei')
                },
                "summary": {
                    "tokenIn": request.tokenIn,
                    "tokenOut": request.tokenOut,
                    "amountIn": request.amountIn,
                    "amountOutMin": request.amountOutMin,
                    "to": to_address
                }
            }
    except Exception as e:
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
        
        # Convert amount to wei (assuming 18 decimals for simplicity)
        amount_in_wei = int(request.amountIn * 10**18)
        
        # Mock exchange rates for development
        exchange_rates = {
            "ETH_BTC": 0.06,
            "ETH_USDT": 3000,
            "ETH_USDC": 3000,
            "BTC_ETH": 16.67,
            "BTC_USDT": 50000,
            "BTC_USDC": 50000,
            "USDT_ETH": 0.00033,
            "USDT_BTC": 0.00002,
            "USDT_USDC": 1,
            "USDC_ETH": 0.00033,
            "USDC_BTC": 0.00002,
            "USDC_USDT": 1
        }
        
        # Calculate the expected output amount
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

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "ok"}

# Endpoint to get available tokens
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

# Exception handlers to ensure proper JSON responses
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
    print(f"Unhandled exception in swap_api: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
        headers={"Content-Type": "application/json"},
    )
