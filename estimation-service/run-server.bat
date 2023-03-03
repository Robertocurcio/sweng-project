@echo off
setlocal EnableDelayedExpansion

set "dir=%~dp0"
cd /d "!dir!" && python server.py
