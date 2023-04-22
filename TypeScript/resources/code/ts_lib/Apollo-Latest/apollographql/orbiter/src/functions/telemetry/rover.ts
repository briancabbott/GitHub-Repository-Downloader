import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import { track } from "../../lib/track";
import {
  RoverTrackMutationVariables,
  RoverArgumentInput,
  RoverTrackDocument,
} from "../../generated/studio";
import { MALFORMED_REQUEST, Platform } from "./telemetry";

export const ROVER_AGENT: string = "rover";

interface Command {
  // the name of the command that was run
  name: string;
  // the arguments that were passed to the command
  arguments: object;
}

interface Session {
  // the command usage where commands are paths and flags are query strings
  // i.e. ap schema push --graph --variant would become ap/schema/push?graph&variant
  command: Command;
  // Apollo generated machine ID. This is a UUID and stored globally at ~/.apollo/config.toml
  machine_id: string;
  // A unique session id
  session_id: string;
  // the sha-256 hash of the current working directory
  cwd_hash: string;
  // the sha-256 hash of the git remote URL
  remote_url_hash: string | null;
  // Information about the current architecture/platform
  platform: Platform;
  // The current version of the CLI
  cli_version: string;
}

export async function roverHandler(
  event: APIGatewayProxyEvent,
  userAgent: string
): Promise<APIGatewayProxyResult> {
  // Make sure the body exists and contains the right keys to properly build
  // a Session
  if (!event.body) return MALFORMED_REQUEST;
  const session: Session = JSON.parse(event.body);
  if (!session || !session.platform || !session.command)
    return MALFORMED_REQUEST;

  // we intentionally don't `await` this fn, because we don't want to block
  trackRover(session, userAgent);

  return {
    statusCode: 200,
    body: "Report received",
  };
}

export async function trackRover(session: Session, userAgent: string) {
  let args = new Array<RoverArgumentInput>();
  for (const [key, value] of Object.entries(session.command.arguments)) {
    let input: RoverArgumentInput = {
      key,
      value,
    };
    args.push(input);
  }
  const variables: RoverTrackMutationVariables = {
    anonymousId: session.machine_id,
    command: session.command.name,
    cwdHash: session.cwd_hash,
    os: session.platform.os,
    remoteUrlHash: session.remote_url_hash,
    sessionId: session.session_id,
    version: session.cli_version,
    arguments: args,
    ci: session.platform.continuous_integration,
  };
  await track(RoverTrackDocument, variables, userAgent);
}
