#!/bin/bash

if ! [ -x "$(command -v jq)" ]; then
  echo 'Error: jq is not installed.' >&2
  exit 1
fi

set -e

cd packages

cd graphql-playground-react
yarn install
echo "Releasing @apollographql/graphql-playground-react..."
yarn version --no-git-tag-version --new-version patch
yarn publish --non-interactive --access public
export version=$(cat package.json | jq -r '.version')
cd ..

echo "Updating JSDeliver cache..."
curl -X POST \
  http://purge.jsdelivr.net/ \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
	"path": [
		"/npm/@apollographql/graphql-playground-react/build/static/css/middleware.css",
		"/npm/@apollographql/graphql-playground-react/build/static/js/middleware.js"
	]
}'

