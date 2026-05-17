
# Load environment variables
. "$PSScriptRoot\env_vars.ps1"

# Ensure the user install path is a directory.
if (Test-Path -Path $env:USER_INSTALL_DIR -PathType Leaf) {
    Remove-Item -Path $env:USER_INSTALL_DIR -Force
}

if (-not (Test-Path -Path $env:USER_INSTALL_DIR -PathType Container)) {
    New-Item -ItemType Directory -Path $env:USER_INSTALL_DIR -Force | Out-Null
}

if (-not (Test-Path -Path $env:DIST_DIR -PathType Container)) {
    throw "DIST_DIR does not exist or is not a directory: $env:DIST_DIR"
}

# Copy application files to the user install directory
Copy-Item -Path (Join-Path $env:DIST_DIR '*') -Destination $env:USER_INSTALL_DIR -Recurse -Force
Copy-Item -Path "$env:TOK_FILE" -Destination $env:USER_INSTALL_DIR -Force

$ghdPs1Path = Join-Path $env:USER_INSTALL_DIR 'ghd.ps1'
$ghdMainCliPath = Join-Path $env:DIST_DIR 'main_cli.js'
$ghdDefaultToken = $env:TOK_FILE
$ghdPs1Content = @"
`$defaultTokenFile = '$ghdDefaultToken'
`$mainCli = '$ghdMainCliPath'
`$tokenFile = if (`$env:TOK_FILE) { `$env:TOK_FILE } else { `$defaultTokenFile }

if (-not (Test-Path -Path `$mainCli -PathType Leaf)) {
    throw "main_cli.js was not found at: `$mainCli"
}

node `$mainCli download --github-auth-token-file `$tokenFile @args
"@
Set-Content -Path $ghdPs1Path -Value $ghdPs1Content -Encoding Ascii

$ghdCmdPath = Join-Path $env:USER_INSTALL_DIR 'ghd.cmd'
$ghdCmdContent = @"
@echo off
pwsh -NoProfile -ExecutionPolicy Bypass -File "%~dp0ghd.ps1" %*
"@
Set-Content -Path $ghdCmdPath -Value $ghdCmdContent -Encoding Ascii

# Add it to the PATH if it's not already there
if (-not ($env:Path -split [System.IO.Path]::PathSeparator | Where-Object { $_ -eq $env:USER_INSTALL_DIR })) {
    $env:Path += [System.IO.Path]::PathSeparator + $env:USER_INSTALL_DIR
}

# Write-Host "OSKIND: $OSKIND"
# Write-Host "SRC_LOCATION: $SRC_LOCATION"
# Write-Host "APPLICATION_INSTALL_DIR: $APPLICATION_INSTALL_DIR"
# Write-Host "USER_CONFIG_FILES_DIR: $USER_CONFIG_FILES_DIR"
# Write-Host "USER_INSTALL_DIR: $USER_INSTALL_DIR"

