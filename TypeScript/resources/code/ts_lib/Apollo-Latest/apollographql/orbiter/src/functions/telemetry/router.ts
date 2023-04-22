import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import { track } from "../../lib/track";
import {
  RouterTrackDocument,
  RouterTrackMutationVariables,
  RouterUsageInput,
} from "../../generated/studio";
import { MALFORMED_REQUEST, Platform } from "./telemetry";

export const ROUTER_AGENT: string = "router";

interface Request {
  // A random ID that is generated on first startup of the Router. It is not persistent between restarts of the Router, but will be persistent for hot reloads
  session_id: string;
  // The version of the Router
  version: string;
  // Information about the current architecture/platform
  platform: Platform;
  // Information about what was being used
  usage: object;
}

export async function routerHandler(
  event: APIGatewayProxyEvent,
  userAgent: string
): Promise<APIGatewayProxyResult> {
  // Make sure the body exists and contains the right keys to properly build
  // a Session
  if (!event.body) return MALFORMED_REQUEST;
  const request: Request = JSON.parse(event.body);
  if (!request || !request.platform || !request.usage) return MALFORMED_REQUEST;

  // we intentionally don't `await` this fn, because we don't want to block
  trackRouter(request, userAgent);

  return {
    statusCode: 200,
    body: "Report received",
  };
}

export async function trackRouter(request: Request, userAgent: string) {
  let usage = new Array<RouterUsageInput>();
  for (const [key, count] of Object.entries(request.usage)) {
    let input: RouterUsageInput = {
      key,
      count,
    };
    usage.push(input);
  }
  const variables: RouterTrackMutationVariables = {
    sessionId: request.session_id,
    os: request.platform.os,
    ci: request.platform.continuous_integration,
    version: request.version,
    usage: usage,
  };
  await track(RouterTrackDocument, variables, userAgent);
}
