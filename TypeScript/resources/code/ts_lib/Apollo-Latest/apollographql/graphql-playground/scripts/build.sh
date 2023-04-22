#!/bin/bash

set -e

cd packages

packages=(
  graphql-playground-html
  graphql-playground-react
)

for pkg in "${packages[@]}"
do
  cd $pkg
  yarn
  echo "Building ${pkg}"
  yarn build
  cd ..
done
