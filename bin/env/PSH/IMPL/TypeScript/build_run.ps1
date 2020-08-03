
$date = Get-Date -UFormat %s

tsc --diagnostics --extendedDiagnostics	
# node --prof ".\dist\src\main.js" > ".\log__$date.txt"