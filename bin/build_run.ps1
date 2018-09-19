
$date = Get-Date -UFormat %s

tsc
node --prof ".\dist\main.js" > ".\log__$date.txt"