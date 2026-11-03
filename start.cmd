@echo off
REM Optional: serve Level Up at http://localhost:5178 (needs Python). You can also just double-click index.html.
cd /d "%~dp0"
start "" http://localhost:5178/
python -m http.server 5178 --bind 127.0.0.1
