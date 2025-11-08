@echo off
echo ============================================
echo 🧠 Amnesia AI - Quick Setup Script
echo ============================================
echo.

REM Check if virtual environment exists
if not exist ".venv" (
    echo [ERROR] Virtual environment not found!
    echo Please run: python -m venv .venv
    pause
    exit /b 1
)

echo [1/4] Activating virtual environment...
call .venv\Scripts\activate.bat

echo [2/4] Installing backend dependencies...
cd backend
pip install -r requirements.txt
if errorlevel 1 (
    echo [ERROR] Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..

echo [3/4] Checking .env file...
if not exist ".env" (
    echo Creating .env from .env.example...
    copy .env.example .env
    echo.
    echo ⚠️  IMPORTANT: Edit .env and add your GROQ_API_KEY!
    echo.
)

echo [4/4] Setup complete!
echo.
echo ============================================
echo Next steps:
echo ============================================
echo 1. Edit .env and add your GROQ_API_KEY
echo 2. Run backend: python backend/main.py
echo 3. In new terminal, run frontend:
echo    cd frontend
echo    npm install
echo    npm run dev
echo ============================================
echo.
pause
