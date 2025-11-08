@echo off
echo Starting Amnesia AI Backend...
cd /d "%~dp0"
call .venv\Scripts\activate.bat
set PORT=8001
python backend\main.py
pause
