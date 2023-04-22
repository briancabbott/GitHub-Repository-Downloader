import {
  Handler,
  APIGatewayProxyResult,
  APIGatewayProxyEvent,
} from "aws-lambda";
import { getFetcher } from "../../lib/getFetcher";
import { initSentry, sentryWrapHandler } from "../../lib/sentry";

initSentry();

const GITHUB_RELEASE =
  "https://github.com/apollographql/apollo-tooling/releases";

const handler: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
  event,
  _context
) => {
  const fetch = getFetcher();

  // silence unused variable warning
  // @ts-ignore: TS6133
  const [_, __, platform, version] = event.path.split("/");

  // rather than 404 with `undefined` as versions later, we can check and fail early here
  if (!platform || !version) {
    return {
      statusCode: 400,
      body: `Missing ${
        !platform ? "platform and " : ""
      }version in URL path. Check your URL and try again. Correct format: "/legacy-cli/darwin/2.x.x"`,
    };
  }

  // this only supports 64 bit architectures. I don't see us changing this but if we do, this will become gross
  const downloadUrl = `${GITHUB_RELEASE}/download/apollo@${version}/apollo-v${version}-darwin-x64.tar.gz`;

  // we just want to make sure it's a valid download so we just need to HEAD
  const response = await fetch(downloadUrl, {
    method: "HEAD",
  });

  if (response.ok) {
    return {
      statusCode: 301,
      headers: {
        Location: downloadUrl,
      },
      body: `Redirecting to ${downloadUrl}`,
    };
  }

  if (response.status === 404) {
    return {
      statusCode: 400,
      body: `Couldn't find release for version ${version} on ${platform} on GitHub Releases. This could be a problem with GitHub being offline or missing this version`,
    };
  }
  return {
    statusCode: 500,
    body: `Error when loading the legacy CLI for ${version} on ${platform} on GitHub releases. This could be because GitHub is down. The error we received from GitHub was ${response.statusText}`,
  };
};

module.exports = {
  handler: sentryWrapHandler(handler),
  unwrappedHandler: handler,
};
