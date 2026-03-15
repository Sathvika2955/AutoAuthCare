@echo off
echo ========================================
echo AutoAuth Agent Platform - Starting Backend
echo ========================================
echo.

cd backend

echo Activating virtual environment...
if exist venv\Scripts\activate.bat (
    call venv\Scripts\activate.bat
) else (
    echo Virtual environment not found. Run setup.bat first!
    pause
    exit /b 1
)

echo.
echo Starting Flask server...
python api\main.py

pause