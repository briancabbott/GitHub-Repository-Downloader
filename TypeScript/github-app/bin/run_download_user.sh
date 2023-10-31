#!/bin/bash

PWD=$(pwd)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"


source $SCRIPT_DIR/../bin/run_setup.sh
node $SCRIPT_DIR/../dist/main_cli.js download --user joelparkerhenderson --github-auth-token-file $TOK

