source ./bin/run_setup.sh
node --trace-deprecation ./dist/main_cli.js download --organization github --github-auth-token-file $TOK
