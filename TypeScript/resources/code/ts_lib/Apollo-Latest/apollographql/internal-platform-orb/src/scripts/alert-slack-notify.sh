#!/bin/sh

BuildMessageBody() {
    echo "Build message body..."
    # Assume custom template parameter set
    # Inserts the required "text" field to the custom json template from block kit builder.
    if [ "$(echo "$SLACK_PARAM_CUSTOM" | jq '.text')" = "null" ]; then
        CUSTOM_BODY_MODIFIED=$(echo "$SLACK_PARAM_CUSTOM" | jq '. + {"text": ""}')
    else
        CUSTOM_BODY_MODIFIED=$(echo "$SLACK_PARAM_CUSTOM" | jq '.')
    fi
    # shellcheck disable=SC2016
    CUSTOM_BODY_MODIFIED=$(echo "$CUSTOM_BODY_MODIFIED" | sed 's/\\/\\\\/g' | sed 's/"/\\"/g' | sed 's/`/\\`/g')
    T2=$(eval echo \""$CUSTOM_BODY_MODIFIED"\")
    CH=$(eval echo \""$SLACK_PARAM_CHANNEL"\")
    SLACK_MSG_BODY=$(echo "$T2" | jq ". + {\"channel\": \"$CH\"}")
}

PostToSlack() {
    echo "Sending body...: $SLACK_MSG_BODY"
    SLACK_SENT_RESPONSE=$(curl -s -f -X POST -H 'Content-type: application/json' -H "Authorization: Bearer $SLACK_ACCESS_TOKEN" --data "$SLACK_MSG_BODY" https://slack.com/api/chat.postMessage)
    SLACK_ERROR_MSG=$(echo "$SLACK_SENT_RESPONSE" | jq '.error')
    if [ ! "$SLACK_ERROR_MSG" = "null" ]; then
        echo "Slack API returned an error message:"
        echo "$SLACK_ERROR_MSG"
        exit 1;
    fi
}

ShouldPost() {
    if ! [[ ( "$CCI_STATUS" = "$SLACK_PARAM_EVENT" ) || ( "$SLACK_PARAM_EVENT" = "always" ) ]]; then
        echo "NO SLACK ALERT"
        echo
        echo "This command is set to send an alert on: $SLACK_PARAM_EVENT"
        echo "Current status: ${CCI_STATUS}"
        exit 0
    fi
}

# Will not run if sourced from another script.
# This is done so this script may be tested.
ORB_TEST_ENV="bats-core"
if [ "${0#*"$ORB_TEST_ENV"}" = "$0" ]; then
    . "/tmp/SLACK_JOB_STATUS"
    ShouldPost
    BuildMessageBody
    PostToSlack
fi