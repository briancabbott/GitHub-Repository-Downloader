& "./bin/run_setup.ps1"

# get parameter for org name from arguments

node ./dist/main_cli.js list --organization github --github-auth-token-file $Env:TOK