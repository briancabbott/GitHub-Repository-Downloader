#!/bin/sh

# https://github.com/zeit/now-cli/issues/817
now="npx now --debug --token=$NOW_TOKEN"

echo "$ now --public"
$now --public

echo "$ now alias"
$now alias

echo "$ now rm --safe --yes octokit-fixtures"
$now rm --safe --yes octokit-fixtures
