import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";
import { initSentry, sentryWrapHandler } from "../../lib/sentry";
import { ROVER_AGENT, roverHandler } from "./rover";
import { ROUTER_AGENT, routerHandler } from "./router";

initSentry();

export interface Platform {
  // the platform from which the command was run (i.e. linux, macOS, or windows)
  os: string;
  // CI info
  continuous_integration: string | null;
}

export const MALFORMED_REQUEST = {
  statusCode: 400,
  body: "Malformed Request",
};

export const INVALID_PERMISSIONS = {
  statusCode: 403,
  body: "Invalid Permissions",
};

const handler: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
  event
) => {
  const headers = event.headers;
  const contentType = headers["content-type"];
  const userAgent = headers["user-agent"];

  if (!contentType || !contentType.includes("application/json"))
    return MALFORMED_REQUEST;
  if (userAgent && userAgent.startsWith(ROVER_AGENT))
    return await roverHandler(event, userAgent);
  if (userAgent && userAgent.startsWith(ROUTER_AGENT))
    return await routerHandler(event, userAgent);

  return INVALID_PERMISSIONS;
};

module.exports.handler = sentryWrapHandler(handler);
