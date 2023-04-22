import React, { useEffect } from 'react';
import './App.css';
import { EMBEDDABLE_EXPLORER_URL } from './constants';
import { setupEmbedRelay } from './setupEmbedRelay';

export type JSONPrimitive = boolean | null | string | number;
export type JSONObject = { [key in string]?: JSONValue };
export type JSONValue = JSONPrimitive | JSONValue[] | JSONObject;

export const App = ()=> {

  useEffect(() => {
    setupEmbedRelay();
  }, [])

  // Provide iframe options via URL query parameters
  // When you want to manually introspect a schema, don't include a graphRef here
  // When you want to make network requests from the Explorer, change `sendRequestsFrom` to 'embed'
  const explorerURL = EMBEDDABLE_EXPLORER_URL +
  '?graphRef=Apollo-Fullstack-Demo-o3tsz8@current' +
  '&docsPanelState=closed' +
  '&sendRequestsFrom=parent'+
  '&shouldPersistState=false'+
  `&document=${window.encodeURIComponent(`# Run this first to get an api key
# and set your Authorization header to that api key
mutation Login($loginEmail: String) {
  login(email: $loginEmail)
}

query TripsBookedQuery {
  me {
    email
  }
  tripsBooked
}

mutation BookTripsMutation($bookTripsLaunchIds: [ID]!) {
  bookTrips(launchIds: $bookTripsLaunchIds) {
    message
  }
}

subscription TripsBookedSubscription {
  tripsBooked
}`)}` +
      `&variables=${window.encodeURIComponent(
        JSON.stringify({
          bookTripsLaunchIds: ["108", "109"],
          loginEmail: "demo@apollographql.com",
        })
      )}` +
      `&searcQuery=Query.me` +
      `&headers=${window.encodeURIComponent(
        JSON.stringify({
          ExampleHeader: "hello"
        })
      )}`;

  return (
    <div className="App">
      <h1 className="demo-app-title">Apollo's Embedded Explorer Demo App</h1>
      <iframe id="embedded-explorer" className="embedded-explorer-iframe"title="embedded-explorer" src={explorerURL}/>
    </div>
  );
}
