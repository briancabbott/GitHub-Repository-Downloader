#!/bin/sh

tsc --diagnostics --extendedDiagnostics
# node --prof ".\dist\src\main.js" > ".\log__$date.txt"
