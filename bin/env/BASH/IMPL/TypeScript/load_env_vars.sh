#!/bin/sh

NODE_BIN=node
NODE_OPTS=""

# The platform which is identified by the languages file extension of which
# implementation is being installed/operated on. The platforms are:
#    - Clojure (as "clj")
#    - TypeScript (as "ts")
#
GHRD_PLATFORM="ts"
# For the given platform, what is the toplevel directory within the Project of the
# where the artifacts reside. Choices are:
#    - Clojure (as "Clojure")
#    - TypeScript (as "TypeScript")
GHRD_PLATFORM_DIR="TypeScript"
GHRD_INSTALL_LOCATION=/usr/local/github-repository-downloader
