@echo off
echo Starting Amnesia AI - Full Stack...
echo.
echo Starting Backend on port 8001...
start "Amnesia Backend" cmd /k "call .venv\Scripts\activate.bat && set PORT=8001 && python backend\main.py"
timeout /t 3 /nobreak
echo.
echo Starting Frontend on port 5174...
start "Amnesia Frontend" cmd /k "cd frontend && npm run dev"
echo.
echo Both servers are starting...
echo Backend: http://localhost:8001
echo Frontend: http://localhost:5174
echo.
pause
