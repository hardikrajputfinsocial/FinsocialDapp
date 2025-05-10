@echo off
echo Starting Frontend and Backend servers...

start cmd /k "cd FinsocialDapp && npm run dev"
start cmd /k "cd backend && python -m uvicorn api.login_api:app --reload"

echo Servers started in separate windows.
