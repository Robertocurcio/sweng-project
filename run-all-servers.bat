@echo off
setlocal EnableDelayedExpansion

set "dir=%~dp0"

cd /d "!dir!\account-service" && start cmd /c node account-server.js
cd /d "!dir!\estimation-service" && start cmd /c node estimation-server.js
cd /d "!dir!\frontend-application" && start cmd /c node frontend-server.js


