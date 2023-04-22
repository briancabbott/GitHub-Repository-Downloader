#!/bin/bash

set -e

cd packages

packages=(
  graphql-playground-react
  graphql-playground-html
)

for pkg in "${packages[@]}"
do
  cd $pkg
  version=$(cat package.json | jq -r '.version')
  echo "$pkg: $version"
  cd ..
done