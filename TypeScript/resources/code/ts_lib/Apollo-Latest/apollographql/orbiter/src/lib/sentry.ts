// https://docs.sentry.io/platforms/node/guides/aws-lambda/
import { AWSLambda as SentryLambda } from "@sentry/serverless";
import { Handler } from "aws-lambda";

export function initSentry() {
  SentryLambda.init();
}

function wrapHandler<TEvent, TResult>(
  handler: Handler<TEvent, TResult>,
  wrapOptions?: Partial<SentryLambda.WrapperOptions>
): Handler<TEvent, TResult> {
  // NODE_ENV is set to production in our Netlify environment variables.
  if (process.env.NODE_ENV === "production") {
    let wrappedHandler: Handler<TEvent, TResult>;
    if (process.env.SENTRY_DSN) {
      let tryHandler = SentryLambda.wrapHandler(handler, wrapOptions);
      if (!tryHandler) {
        throw new Error(
          "something went wrong while initiating the Sentry handler"
        );
      } else {
        wrappedHandler = tryHandler as Handler<TEvent, TResult>;
      }
    } else {
      throw new Error("$SENTRY_DSN is not defined.");
    }

    return wrappedHandler;
  } else {
    return handler;
  }
}

export const sentryWrapHandler = wrapHandler;
