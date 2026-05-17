$pathValue = $env:Path
$separator = [System.IO.Path]::PathSeparator

Write-Host "PATH:"
Write-Host $pathValue
Write-Host ""
Write-Host "PATH entries:"

$pathValue -split [regex]::Escape([string]$separator) |
    Where-Object { -not [string]::IsNullOrWhiteSpace($_) } |
    ForEach-Object { Write-Host $_ }
