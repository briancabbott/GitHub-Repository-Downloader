import {
  Handler,
  APIGatewayProxyResult,
  APIGatewayProxyEvent,
} from "aws-lambda";
import { initSentry, sentryWrapHandler } from "../../lib/sentry";
import { downloadEvent } from "../../lib/download";

initSentry();

const handler: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
  event
) => {
  try {
    // rover.apollo.dev / tar / rover / x86_64-unknown-linux-gnu / v0.1.0
    // rover.apollo.dev / tar / supergraph / x86_64-apple-darwin / latest-2
    // rover.apollo.dev / tar / router / aarch64-apple-darwin / latest-plugin
    const [_rootDomain, _tarPrefix, binaryName, targetTriple, version] =
      event.path.split("/");
    return downloadEvent(binaryName, targetTriple, version, "tarball");
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
