import "./App.css";
import { SubscriptionClient } from "subscriptions-transport-ws";
import {
  EMBEDDABLE_EXPLORER_URL,
  EXPLORER_QUERY_MUTATION_REQUEST,
  EXPLORER_QUERY_MUTATION_RESPONSE,
  EXPLORER_SUBSCRIPTION_REQUEST,
  EXPLORER_SUBSCRIPTION_RESPONSE,
  EXPLORER_SUBSCRIPTION_TERMINATION,
} from "./constants";

// Helper function that adds content-type: application/json
// to each request's headers if not present
function getHeadersWithContentType(
  headers: Record<string, string> | undefined
) {
  const headersWithContentType = headers ?? {};
  if (
    Object.keys(headersWithContentType).every(
      (key) => key.toLowerCase() !== "content-type"
    )
  ) {
    headersWithContentType["content-type"] = "application/json";
  }
  return headersWithContentType;
}

// Function for executing operations
async function executeOperation({
  operation,
  operationName,
  variables,
  headers,
  embeddedExplorerIFrame,
  operationId,
}: {
  operation: string;
  operationId: string;
  operationName?: string;
  variables?: Record<string, string>;
  headers?: Record<string, string>;
  embeddedExplorerIFrame?: HTMLIFrameElement;
}) {
  const response = await fetch(
    // Substitute your server's URL for this example URL.
    "https://apollo-fullstack-tutorial.herokuapp.com/",
    {
      method: "POST",
      headers: getHeadersWithContentType(headers),
      body: JSON.stringify({
        query: operation,
        variables,
        operationName,
      }),
    }
  );
  await response.json().then((response) => {
    // After the operation completes, post a response message to the
    // iframe that includes the response data
    embeddedExplorerIFrame?.contentWindow?.postMessage(
      {
        // Include the same operation ID in the response message's name
        // so the Explorer knows which operation it's associated with
        name: EXPLORER_QUERY_MUTATION_RESPONSE,
        operationId,
        response,
      },
      EMBEDDABLE_EXPLORER_URL
    );
  });
}

// Function for executing subscriptions
async function executeSubscription({
  operation,
  operationName,
  variables,
  headers,
  embeddedExplorerIFrame,
  operationId,
}: {
  operation: string;
  operationName?: string;
  variables?: Record<string, string>;
  headers?: Record<string, string>;
  embeddedExplorerIFrame?: HTMLIFrameElement;
  operationId: string;
}) {
  const getClient = () => {
    try {
      return new SubscriptionClient(
        // Substitute your server's subscription URL for this example URL.
        "wss://apollo-fullstack-tutorial.herokuapp.com/graphql",
        {
          reconnect: true,
          lazy: true,
          connectionParams: headers ?? {},
        }
      );
    } catch {
      return undefined;
    }
  };
  const client = getClient();

  client
    ?.request({
      query: operation,
      operationName,
      variables: variables ?? undefined,
    })
    .subscribe({
      next(response) {
        // Everytime you get a subscription response,
        // post a response message to the iframe that includes the response data
        embeddedExplorerIFrame?.contentWindow?.postMessage(
          {
            // Include the same operation ID in the response message's name
            // so the Explorer knows which operation it's associated with
            name: EXPLORER_SUBSCRIPTION_RESPONSE,
            operationId,
            response,
          },
          EMBEDDABLE_EXPLORER_URL
        );
      },
    });

  const checkForSubscriptionTermination = (
    event: MessageEvent<{
      name?: string;
    }>
  ) => {
    if (event.data.name === EXPLORER_SUBSCRIPTION_TERMINATION) {
      client?.unsubscribeAll();
      window.removeEventListener("message", checkForSubscriptionTermination);
    }
  };

  window.addEventListener("message", checkForSubscriptionTermination);
}

export function setupEmbedRelay() {
  // Callback definition
  const onPostMessageReceived = (
    event: MessageEvent<{
      name?: string;
      operation?: string;
      operationId?: string;
      operationName?: string;
      variables?: Record<string, string>;
      headers?: Record<string, string>;
    }>
  ) => {
    // Obtain the iframe element by any applicable logic for your page.
    // This obtains an element with ID `embedded-explorer`.
    const embeddedExplorerIFrame =
      (document.getElementById("embedded-explorer") as HTMLIFrameElement) ??
      undefined;

    // Check to see if the posted message indicates that the user is
    // executing a query or mutation or subscription in the Explorer
    const isQueryOrMutation =
      "name" in event.data &&
      event.data.name === EXPLORER_QUERY_MUTATION_REQUEST;
    const isSubscription =
      "name" in event.data && event.data.name === EXPLORER_SUBSCRIPTION_REQUEST;

    // If the user is executing a query or mutation or subscription...
    if (
      (isQueryOrMutation || isSubscription) &&
      event.data.name &&
      event.data.operation &&
      event.data.operationId
    ) {
      // Extract the operation details from the event.data object
      const { operation, operationId, operationName, variables, headers } =
        event.data;
      if (isQueryOrMutation) {
        executeOperation({
          operation,
          operationName,
          variables,
          headers,
          embeddedExplorerIFrame,
          operationId,
        });
      } else {
        executeSubscription({
          operation,
          operationName,
          variables,
          headers,
          embeddedExplorerIFrame,
          operationId,
        });
      }
    }
  };
  // Execute our callback whenever window.postMessage is called
  window.addEventListener("message", onPostMessageReceived);
}
