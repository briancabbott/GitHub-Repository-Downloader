#!/bin/bash

#==============================================================================#
#                                  SETUP                                       #
#==============================================================================#

# Start in scripts/integration-tests/ even if run from root directory
cd "$(dirname "$0")" || exit

source utils/local-registry.sh
source utils/cleanup.sh

# Echo every command being executed
set -x

# Go to the root of the monorepo
cd ../..

#==============================================================================#
#                                   TEST                                       #
#==============================================================================#

if [ "$BABEL_8_BREAKING" = true ] ; then
  # This option is removed in Babel 8
  sed -i 's/allowDeclareFields: true,\?/\/* allowDeclareFields: true *\//g' babel.config.js
fi

startLocalRegistry "$PWD"/scripts/integration-tests/verdaccio-config.yml

# We only bump dependencies in the top-level package.json, because workspaces
# already use the workspace: protocol so will get the version in the monorepo
# and not from npm.
node "$PWD"/scripts/integration-tests/utils/bump-babel-dependencies.js

# Update deps, build and test
if [ "$BABEL_8_BREAKING" = true ] ; then
  YARN_ENABLE_IMMUTABLE_INSTALLS=false make -j build-standalone-ci

  # Jest hangs forever in the Babel 8 e2e test when using multiple workers,
  # but we don't know yet why. Until we figure it out (see
  # https://github.com/babel/babel/pull/13618) we can use --runInBand.
  # Additinally, in Babel 8 tests Jest needs to run with ESM support because
  # @babel/eslint-parser/lib/worker/babel-core.cjs uses dynamic import() to
  # load @babel/core.
  NODE_OPTIONS="--experimental-vm-modules" BABEL_ENV=test yarn jest --ci --runInBand

  make -j test-clean
else
  YARN_ENABLE_IMMUTABLE_INSTALLS=false make -j test-ci
fi

cleanup
