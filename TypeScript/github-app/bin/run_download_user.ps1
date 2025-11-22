[CmdletBinding(DefaultParameterSetName="User")]
param(
    [Parameter(Mandatory=$true, Position=0)]
    [ValidateSet("download", "list")]
    [string]$Command,

    [Parameter(Mandatory=$true, ParameterSetName="User")]
    [string]$User,

    [Parameter(Mandatory=$true, ParameterSetName="Organization")]
    [string]$Organization,

    [Parameter(Mandatory=$false)]
    [string]$Out,

    [Parameter(Mandatory=$false)]
    [string]$Jq
)

& "./bin/run_setup.ps1"

$nodeArgs = @($Command)

if ($PSCmdlet.ParameterSetName -eq "User") {
    $nodeArgs += "--user"
    $nodeArgs += $User
}
elseif ($PSCmdlet.ParameterSetName -eq "Organization") {
    $nodeArgs += "--organization"
    $nodeArgs += $Organization
}

$nodeArgs += "--github-auth-token-file"
$nodeArgs += "$Env:TOK"

if ($PSCmdlet.ParameterSetName -eq "Out") {
    $nodeArgs += ">"
    $nodeArgs += $Out
}
Write-Host "Running: node ./dist/main_cli.js $nodeArgs"

# Define the base command execution block
$scriptBlock = {
    if ($Jq) {
        if (-not (Get-Command jq -ErrorAction SilentlyContinue)) {
            Write-Error "jq is not installed or not in PATH."
            exit 1
        }
        # Run node, filter out the header line, and pipe to jq
        node ./dist/main_cli.js @nodeArgs | 
            Where-Object { $_ -ne "Repositories List Command Results" } | 
            jq $Jq
    } else {
        node ./dist/main_cli.js @nodeArgs
    }
}

# Execute and handle output redirection
if ($Out) {
    & $scriptBlock | Set-Content -Path $Out
} else {
    & $scriptBlock
}
