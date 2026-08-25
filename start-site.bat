@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo  Запуск локального просмотра сайта...
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-site.ps1"
pause
