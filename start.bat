@echo off

start /B %~dp0\nginx.exe
start /B %~dp0\php\php-cgi.exe -b 127.0.0.1:9000 -c %~dp0\php\php.ini
ping 127.0.0.1 - 1>NULL
echo Server Starting...
echo.
echo Run NgenTube Sreaming..
start /B chrome http://localhost:8888/index.php

exit

