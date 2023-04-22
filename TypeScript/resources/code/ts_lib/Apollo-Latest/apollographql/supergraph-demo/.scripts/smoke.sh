#!/bin/bash

PORT="${1:-4000}"
COUNT="${2:-1}"

OK_CHECK="\xE2\x9C\x85"
FAIL_MARK="\xE2\x9D\x8C"
ROCKET="\xF0\x9F\x9A\x80"

err() {
    local red=`tput setaf 1 2>/dev/null || echo ''`
    local reset=`tput sgr0 2>/dev/null || echo ''`
    echo "${red}ERROR${reset}: $1" >&2
    exit 1
}

exec_curl() {
  ERR=""
  RES=$("$@" 2>/dev/null)
  EXIT_CODE=$?
  if [ $EXIT_CODE -ne 0 ]; then
    echo "$@"
    if [ $EXIT_CODE -eq 7 ]; then
      ERR="CURL ERROR 7: Failed to connect() to host or proxy."
    elif [ $EXIT_CODE -eq 52 ]; then
      ERR="CURL ERROR 52: Empty reply from server."
    elif [ $EXIT_CODE -eq 56 ]; then
      ERR="CURL ERROR 56: Recv failure: Connection reset by peer."
    else
      ERR="CURL ERROR $EXIT_CODE\n"
    fi
  fi
  return $EXIT_CODE
}

TESTS=(1 2 4)
DEFER_TESTS=(5 6)

HAS_DEFER=0

# introspection query
exec_curl curl -X POST http://localhost:$PORT/ \
  -H "Content-Type: application/json" \
  --data '{ "query": "query { __schema { directives { name }}}" }'
if [ $? != 0 ]; then err "$ERR"; fi
printf "$OK_CHECK Introspection Success!\n"

if echo "$RES" | grep -q '{"name":"defer"}'; then HAS_DEFER=1; fi

if [ $HAS_DEFER -eq 1 ]; then
  echo " - has @defer support"
  TESTS=("${TESTS[@]}" "${DEFER_TESTS[@]}")
else
  echo " - no @defer support"
fi
printf "\n"

# --------------------------------------------------------------------
# TEST 1
# --------------------------------------------------------------------
DESCR_1="allProducts with delivery"
OPNAME_1="allProdDelivery"
ACCEPT_1="application/json"
read -r -d '' QUERY_1 <<"EOF"
query allProdDelivery {
  allProducts {
    delivery {
      estimatedDelivery,
      fastestDelivery
    },
    createdBy {
      name,
      email
    }
  }
}
EOF

OP_1=equals

read -r -d '' EXP_1 <<"EOF"
{"data":{"allProducts":[{"delivery":{"estimatedDelivery":"6/25/2021","fastestDelivery":"6/24/2021"},"createdBy":{"name":"Apollo Studio Support","email":"support@apollographql.com"}},{"delivery":{"estimatedDelivery":"6/25/2021","fastestDelivery":"6/24/2021"},"createdBy":{"name":"Apollo Studio Support","email":"support@apollographql.com"}}]}}
EOF

# --------------------------------------------------------------------
# TEST 2
# --------------------------------------------------------------------
DESCR_2="allProducts with totalProductsCreated"
OPNAME_2="allProdCreated"
ACCEPT_2="application/json"
read -r -d '' QUERY_2 <<"EOF"
query allProdCreated {
  allProducts {
    id,
    sku,
    createdBy {
      email,
      totalProductsCreated
    }
  }
}
EOF

OP_2=equals

read -r -d '' EXP_2 <<"EOF"
{"data":{"allProducts":[{"id":"apollo-federation","sku":"federation","createdBy":{"email":"support@apollographql.com","totalProductsCreated":1337}},{"id":"apollo-studio","sku":"studio","createdBy":{"email":"support@apollographql.com","totalProductsCreated":1337}}]}}
EOF

# --------------------------------------------------------------------
# TEST 3 - @inaccessible in subgraphs - disabled for Fed 1
# --------------------------------------------------------------------
DESCR_3="hidden: String @inaccessible should return error"
OPNAME_3="inaccessibleError"
ACCEPT_3="application/json"
read -r -d '' QUERY_3 <<"EOF"
query inaccessibleError {
  allProducts {
    id,
    hidden,
    dimensions {
      size,
      weight
    }
  }
}
EOF

OP_3=contains

read -r -d '' EXP_3 <<"EOF"
Cannot query field \"hidden\" on type \"ProductItf\".
EOF

# --------------------------------------------------------------------
# TEST 4
# --------------------------------------------------------------------
DESCR_4="exampleQuery with pandas"
OPNAME_4="exampleQuery"
ACCEPT_4="application/json"
read -r -d '' QUERY_4 <<"EOF"
query exampleQuery {
 allProducts {
   id,
   sku,
   dimensions {
     size,
     weight
   }
   delivery {
     estimatedDelivery,
     fastestDelivery
   }
 }
 allPandas {
   name,
   favoriteFood
 }
}
EOF

OP_4=equals

read -r -d '' EXP_4 <<"EOF"
{"data":{"allProducts":[{"id":"apollo-federation","sku":"federation","dimensions":{"size":"1","weight":1},"delivery":{"estimatedDelivery":"6/25/2021","fastestDelivery":"6/24/2021"}},{"id":"apollo-studio","sku":"studio","dimensions":{"size":"1","weight":1},"delivery":{"estimatedDelivery":"6/25/2021","fastestDelivery":"6/24/2021"}}],"allPandas":[{"name":"Basi","favoriteFood":"bamboo leaves"},{"name":"Yun","favoriteFood":"apple"}]}}
EOF

# --------------------------------------------------------------------
# TEST 5
# --------------------------------------------------------------------
DESCR_5="defer variation query"
OPNAME_5="deferVariation"
ACCEPT_5="multipart/mixed; deferSpec=20220824, application/json"
read -r -d '' QUERY_5 <<"EOF"
query deferVariation {
  allProducts {
    variation {
      ...MyFragment @defer
    },
    sku,
    id
  }
}
fragment MyFragment on ProductVariation {
  id
}
EOF
OP_5=equals

IFS= read -r -d '' EXP_5 <<"EOF"

--graphql
content-type: application/json

{"data":{"allProducts":[{"sku":"federation","id":"apollo-federation"},{"sku":"studio","id":"apollo-studio"}]},"hasNext":true}
--graphql
content-type: application/json

{"hasNext":false,"incremental":[{"data":{"id":"OSS"},"path":["allProducts",0,"variation"]},{"data":{"id":"platform"},"path":["allProducts",1,"variation"]}]}
--graphql--
EOF

# --------------------------------------------------------------------
# TEST 6
# --------------------------------------------------------------------
DESCR_6="deferred user query"
OPNAME_6="deferUser"
ACCEPT_6="multipart/mixed; deferSpec=20220824, application/json"
read -r -d '' QUERY_6 <<"EOF"
query deferUser {
  allProducts {
    createdBy {
      ...MyFragment @defer
    }
    sku
    id 
  }
}

fragment MyFragment on User { name }
EOF

OP_6=equals

IFS= read -r -d '' EXP_6 <<"EOF"

--graphql
content-type: application/json

{"data":{"allProducts":[{"sku":"federation","id":"apollo-federation"},{"sku":"studio","id":"apollo-studio"}]},"hasNext":true}
--graphql
content-type: application/json

{"hasNext":false,"incremental":[{"data":{"name":"Apollo Studio Support"},"path":["allProducts",0,"createdBy"]},{"data":{"name":"Apollo Studio Support"},"path":["allProducts",1,"createdBy"]}]}
--graphql--
EOF

set -e

printf "Running smoke tests ... $ROCKET $ROCKET $ROCKET\n"
trap 'rm -f *.tmp' EXIT
sleep 2

run_tests ( ){
  for (( i=1; i<=$COUNT; i++ )); do
    for test in ${TESTS[@]}; do
      descr_var="DESCR_$test"
      query_var="QUERY_$test"
      exp_var="EXP_$test"
      op_var="OP_$test"
      opname_var="OPNAME_$test"
      accept_var="ACCEPT_$test"
      is_slow_var="ISSLOW_$test"

      DESCR="${!descr_var}"
      QUERY=$(echo "${!query_var}" | tr '\n' ' ' | awk '$1=$1')
      EXP="${!exp_var}"
      OP="${!op_var}"
      OPNAME="${!opname_var}"
      ACCEPT="${!accept_var}"
      ISSLOW="${!is_slow_var}"
      CMD=(curl -i -X POST -H "Content-Type: application/json" -H "apollographql-client-name: smoke-test" -H "accept:${ACCEPT}" --data "{ \"query\": \"${QUERY}\", \"operationName\": \"$OPNAME\" }" http://localhost:$PORT/ )

      if [ $i -gt 1 ]; then
        if [ "$ISSLOW" == "true" ]; then
          continue
        fi
      fi

      if [ $COUNT -le 1 ]; then
        echo ""
        echo "=============================================================="
        echo "TEST $test: $DESCR"
        echo "=============================================================="
        echo "${CMD[@]}"
      fi

      # execute operation
      set +e
      RESULT=$("${CMD[@]}" 2>/dev/null)
      EXIT_CODE=$?
      if [ $EXIT_CODE -ne 0 ]; then
        if [ $EXIT_CODE -eq 7 ]; then
          printf "CURL ERROR 7: Failed to connect() to host or proxy.\n"
        elif [ $EXIT_CODE -eq 52 ]; then
          printf "CURL ERROR 52: Empty reply from server.\n"
        elif [ $EXIT_CODE -eq 56 ]; then
          printf "CURL ERROR 56: Recv failure: Connection reset by peer.\n"
        else
          printf "CURL ERROR $EXIT_CODE\n"
        fi
        printf "${RESULT}"
        printf '\n'
        exit 1
      fi
      set -e

      echo "$RESULT" | awk -v bl=1 'bl{bl=0; h=($0 ~ /HTTP\/1/)} /^\r?$/{bl=1} {print $0>(h?"headers.tmp":"body.tmp")}'
      HEADERS=$(<headers.tmp)
      ACT=$(<body.tmp)

      ACT=$(echo "$ACT" | sed "s/\r//g" | sed "s/\n\n/\n/g")
      EXP=$(echo "$EXP" | sed "s/\r//g" | sed "s/\n\n/\n/g")

      OK=0
      if [ "$OP" == "equals" ]; then
        [[ "$ACT" == "$EXP" ]] && OK=1
      elif [ "$OP" == "startsWith" ]; then
        EXP=$( echo "$EXP" | sed 's|\\|\\\\|g' | sed 's|\[|\\[|g' | sed 's|\]|\\]|g')
        if echo "$ACT" | grep -q "^${EXP}"; then
          OK=1
        fi
      elif [ "$OP" == "contains" ]; then
        EXP=$( echo "$EXP" | sed 's|\\|\\\\|g' | sed 's|\[|\\[|g' | sed 's|\]|\\]|g')
        if echo "$ACT" | grep -q "${EXP}"; then
          OK=1
        fi
      fi

      if [ $OK -eq 1 ]; then
        if [ $COUNT -le 1 ]; then
          echo -------------------------
          echo "[Response Headers]"
          echo "$HEADERS"
          echo -------------------------
          echo "[Response Body]"
          echo "$ACT"
          echo -------------------------
          echo "[Expected Body: $OP]"
          echo "$EXP"
          echo -------------------------
          printf "$OK_CHECK Success!\n"
        fi
      else
          echo -------------------------
          printf "$FAIL_MARK TEST $test Failed! \n"
          echo -------------------------
          if [ $COUNT -gt 1 ]; then
            # only show headers for load tests when an error occurs
            echo "=============================================================="
            echo "TEST $test: $DESCR"
            echo "=============================================================="
            echo -------------------------
            printf '%q ' "${CMD[@]}"
            echo -------------------------
          fi
          echo "[Response Headers]"
          echo "$HEADERS"
          echo -------------------------
          echo "[Response Body]"
          echo "$ACT"
          echo -------------------------
          echo "[Expected Body: $OP]"
          echo "$EXP"
          echo -------------------------
          printf "$FAIL_MARK TEST $test Failed! \n"
          echo -------------------------
          exit 1
      fi
    done
    if [ $COUNT -gt 1 ]; then
      printf "$OK_CHECK $i \n"
    fi
  done

  echo ""
  echo "================================"
  printf "$OK_CHECK ALL TESTS PASS! \n"
  echo "================================"
  echo ""
}

if [ $COUNT -gt 1 ]; then
  time run_tests
else
  run_tests
fi
