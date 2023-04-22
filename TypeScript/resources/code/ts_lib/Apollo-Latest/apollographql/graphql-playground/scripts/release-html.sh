#!/bin/bash

if ! [ -x "$(command -v jq)" ]; then
  echo 'Error: jq is not installed.' >&2
  exit 1
fi

set -e

cd packages

cd graphql-playground-html
echo "Releasing @apollographql/graphql-playground-html..."
yarn version --no-git-tag-version --new-version patch
yarn publish --non-interactive --access public
version=$(cat package.json | jq -r '.version')
cd ..

echo "Sleeping for 15 seconds to wait for registry updates..."
sleep 15

cd graphql-playground-react
yarn add -D @apollographql/graphql-playground-html@$version

