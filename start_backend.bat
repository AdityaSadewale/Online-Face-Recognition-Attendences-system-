@echo off
echo Starting the Face Verification Backend...
cd backend
call venv\Scripts\activate
python api.py
pause
