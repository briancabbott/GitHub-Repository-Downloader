# Accessing OpenTok Advanced Insights GraphQL with Node.js

Depending on the third-party GraphQL endpoint you're trying to use, CORS headers may restrict you from accessing the endpoint directly from your front-end. This sample provides an example of creating an Express Node.js application to abstract third-party GraphQL endpoints on the server side. This allows your front-end application to communicate with your backend which is acting as a middle-man to your third-party GraphQL endpoint.

## Welcome to OpenTok

If you're new to OpenTok, you can [sign up for a Tokbox account](https://tokbox.com/account/user/signup?utm_source=DEV_REL&utm_medium=github&utm_campaign=) and get some free credit to get you started.

## Prerequisites

- A [TokBox Account]
- Optional: [Ngrok](https://ngrok.com/) for test deployment

## Configuring the application

1. Clone this repository.

2. Edit the /js/config.js file and set values each of the variables.

| Variable           | Description                                             |
| ------------------ | ------------------------------------------------------- |
| OPENTOK_API_KEY    | Project specific API Key found in your [TokBox Account] |
| OPENTOK_API_SECRET | Project specific secret found in your [TokBox Account]  |

## Getting Help

We love to hear from you so if you have questions, comments or find a bug in the project, let us know! You can either:

- Open an issue on this repository
- Tweet at us! We're [@NexmoDev on Twitter](https://twitter.com/NexmoDev)
- Or [join the Nexmo Community Slack](https://developer.nexmo.com/community/slack)

## Further Reading

- Check out the Developer Documentation at <https://tokbox.com/developer/>

<!-- add links to the api reference, other documentation, related blog posts, whatever someone who has read this far might find interesting :) -->

[tokbox account]: https://tokbox.com/account
[opentok insights api]: https://tokbox.com/developer/guides/insights/
