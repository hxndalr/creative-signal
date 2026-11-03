@echo off
REM The Creative Signal - Windows setup. Double-click to install or update. Add /quiet to skip opening the app.
if /i "%~1"=="/quiet" (
  powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0setup-files\install-windows.ps1" -Quiet
  exit /b %errorlevel%
)
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0setup-files\install-windows.ps1"
echo.
pause
