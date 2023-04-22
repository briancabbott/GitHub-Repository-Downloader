import fetch, { Fetcher } from "make-fetch-happen";

let fetcher: Fetcher | undefined;

export function getFetcher() {
  return (
    fetcher ||
    (fetcher = fetch.defaults({
      headers: {
        "user-agent": "apollo-orbiter/0.0.1",
      },
      retry: {
        retries: process.env.NODE_ENV === "test" ? 0 : 5,
        // The default expected attempts at 0, 1, 3, 7, 15 & 31 secs. elapsed
        factor: 2,
        // 1 second
        minTimeout: 1000,
        randomize: true,
      },
    }))
  );
}
