#!/bin/sh

auth_token=$(<~/.briancabbott/GitHub-Repository-Downloader/new-full.tk)
echo $auth_token

now=$(date +"%m-%d-%Y")
filename_gql="github-graphql-schema_$now.gql"
filename_json="github-graphql-schema_$now.json"


curl -H "Authorization: bearer $auth_token" https://api.github.com/graphql | python -m json.tool > $filename_json
curl -H "Authorization: bearer $auth_token" -H "Accept: application/vnd.github.v4.idl" https://api.github.com/graphql > $filename_gql