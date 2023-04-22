#!/bin/bash

set -e

function has_hcl_files {
    find $1 -name '*.tf' | grep '.tf' > /dev/null
}

function check_directories_in {
    ENVIRONMENT_DIRECTORIES=$(find $1 -type d -not -path '*/.*' -mindepth 1)
    CONFIG_FILE_LOCATION="$(pwd)/.tflint.hcl"

    #echo "$ENVIRONMENT_DIRECTORIES"
    for current in $ENVIRONMENT_DIRECTORIES
    do
        if has_hcl_files $current ; then
            #echo "tflint $current"
            pushd $current > /dev/null
            echo
            echo "========================================"
            echo "tflint-ing $(pwd)"
            echo "========================================"
            tflint -c $CONFIG_FILE_LOCATION --minimum-failure-severity=error
            popd > /dev/null
        fi
    done
}

for var in "$@"
do
  check_directories_in "$var"
done
