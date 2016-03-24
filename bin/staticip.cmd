@ECHO OFF

SETLOCAL

SET "NODE_EXE=%~dp0\node.exe"
IF NOT EXIST "%NODE_EXE%" (
  SET "NODE_EXE=node"
)

SET "STATICIP_JS=%~dp0\..\staticip.js"
IF NOT EXIST "%STATICIP_JS%" (
  SET "STATICIP_JS=..\staticip.js"
)
