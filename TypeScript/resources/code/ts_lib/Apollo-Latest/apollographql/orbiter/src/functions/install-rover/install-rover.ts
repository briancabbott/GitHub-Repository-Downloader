import {
  Handler,
  APIGatewayProxyResult,
  APIGatewayProxyEvent,
} from "aws-lambda";
import { downloadEvent } from "../../lib/download";
import { initSentry, sentryWrapHandler } from "../../lib/sentry";

initSentry();

const handler: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
  event
) => {
  try {
    // rover.apollo.dev / nix / latest
    // rover.apollo.dev / win / v0.1.0
    let [_, inputPlatform, inputVersion] = event.path.split("/");
    return downloadEvent("rover", inputPlatform, inputVersion, "installer");
  } catch (e) {
    return {
      statusCode: 500,
      body: e.message,
    };
  }
};

module.exports = {
  handler: sentryWrapHandler(handler),
  unwrappedHandler: handler,
};
