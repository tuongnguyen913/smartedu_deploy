@echo off
title SmartEdu Academy - ILA Style Homepage Preview
echo ========================================================
echo  SMARTEDU ACADEMY - ILA STYLE HOMEPAGE PREVIEW
echo  Directory: d:\SmartEdu\SmartEdu.DesignUI\27102026
echo ========================================================
echo.
echo [1/2] Opening index.html in your default web browser...
start "" "%~dp0index.html"
echo.
echo [2/2] Attempting to start local HTTP server on port 5173...
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Starting Python HTTP server on http://localhost:5173/
    echo Press Ctrl+C to stop the server when done.
    cd /d "%~dp0"
    python -m http.server 5173
) else (
    where npx >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        echo Starting serve via npx on http://localhost:5173/
        cd /d "%~dp0"
        npx --yes serve -p 5173 .
    ) else (
        echo Local HTTP server tool not detected (preview opened via file:// protocol).
        pause
    )
)
