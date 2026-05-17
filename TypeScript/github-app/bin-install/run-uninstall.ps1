
# Load environment variables
. "$PSScriptRoot\env_vars.ps1"

Write-Host ""
Write-Host "Uninstalling GitHub-Repository-Downloader..."
Write-Host "  Install directory: $env:USER_INSTALL_DIR"
Write-Host ""

# ── 1. Remove the install directory and all its contents ──
if (Test-Path -Path $env:USER_INSTALL_DIR) {
    Remove-Item -Path $env:USER_INSTALL_DIR -Recurse -Force
    Write-Host "[OK] Removed install directory: $env:USER_INSTALL_DIR"
} else {
    Write-Host "[SKIP] Install directory not found (already removed?): $env:USER_INSTALL_DIR"
}

# ── 2. Remove the install directory from the current session PATH ──
$pathParts = $env:Path -split [System.IO.Path]::PathSeparator |
    Where-Object { $_ -ne $env:USER_INSTALL_DIR }
$env:Path = $pathParts -join [System.IO.Path]::PathSeparator
Write-Host "[OK] Removed from session PATH"

# ── 3. Remove from the persistent User PATH (if present) ──
$userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
if ($userPath -and ($userPath -split ';' | Where-Object { $_ -eq $env:USER_INSTALL_DIR })) {
    $newUserPath = ($userPath -split ';' |
        Where-Object { $_ -ne $env:USER_INSTALL_DIR }) -join ';'
    [Environment]::SetEnvironmentVariable('Path', $newUserPath, 'User')
    Write-Host "[OK] Removed from persistent User PATH"
} else {
    Write-Host "[SKIP] Not found in persistent User PATH"
}

Write-Host ""
Write-Host "Uninstall complete."
Write-Host "Note: Open a new terminal for PATH changes to take full effect."
