# PowerShell script to start both frontend and backend servers

Write-Host "Starting Frontend and Backend servers..." -ForegroundColor Green

# Start the frontend server in a new PowerShell window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\FinsocialDapp'; npm run dev"

# Start the backend server in a new PowerShell window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; python -m uvicorn api.login_api:app --reload"

Write-Host "Servers started in separate windows." -ForegroundColor Green
