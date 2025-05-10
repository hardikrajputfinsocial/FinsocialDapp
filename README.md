# Finsocial DApp - Frontend and Backend Integration

## Project Overview
This project integrates a Next.js frontend with a FastAPI backend to create a decentralized application with wallet connectivity and user authentication.

## Project Structure
- `/FinsocialDapp` - Next.js frontend application
- `/backend` - FastAPI backend application

## Features
- User registration and authentication with JWT
- Wallet connection and management
- Profile management
- Server status monitoring

## Getting Started

### Prerequisites
- Node.js and npm
- Python 3.7+
- Required Python packages: `fastapi`, `uvicorn`, `python-jose`, `passlib`

### Starting the Servers

#### Option 1: Using the PowerShell Script
Run the PowerShell script to start both servers in separate windows:

```powershell
.\start-servers.ps1
```

#### Option 2: Starting Servers Individually

**Frontend Server:**
```bash
cd FinsocialDapp
npm run dev
```

**Backend Server:**
```bash
cd backend
python -m uvicorn api.login_api:app --reload
```

## API Endpoints

- **POST /register** - Register a new user
- **POST /token** - Login and get access token
- **POST /logout** - Logout and revoke token
- **POST /connect-wallet** - Connect an Ethereum wallet to a user account
- **GET /profile** - Get user profile information

## Frontend Routes

- **/** - Home page
- **/login** - User login page
- **/register** - User registration page
- **/dashboard** - User dashboard (protected route)

## Authentication Flow

1. User registers or logs in
2. Backend issues a JWT token
3. Frontend stores the token in localStorage
4. Token is included in the Authorization header for protected API calls
5. Backend validates the token for each protected request

## Development Notes

- The frontend runs on `http://localhost:3000`
- The backend runs on `http://127.0.0.1:8000`
- CORS is configured to allow cross-origin requests between these servers
