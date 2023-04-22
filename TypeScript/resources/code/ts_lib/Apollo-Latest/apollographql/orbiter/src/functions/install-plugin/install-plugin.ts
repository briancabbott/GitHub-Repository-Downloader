import {
  Handler,
  APIGatewayProxyResult,
  APIGatewayProxyEvent,
} from "aws-lambda";
import { downloadEvent } from "../../lib/download";
import { MalformedRequestError } from "../../lib/error";
import { initSentry, sentryWrapHandler } from "../../lib/sentry";

initSentry();

const handler: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
  event
) => {
  try {
    // rover.apollo.dev/ plugins / rover-fed2 / win / v0.4.8
    let [
      _rootDomain,
      _pluginsPrefix,
      inputBinaryName,
      inputPlatform,
      inputVersion,
    ] = event.path.split("/");
    if (inputBinaryName !== "rover-fed2") {
      throw new MalformedRequestError(
        `Invalid binary '${inputBinaryName}'. The only plugin supported by this endpoint is 'rover-fed2'.`
      );
    }
    return downloadEvent(
      inputBinaryName,
      inputPlatform,
      inputVersion,
      "installer"
    );
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
