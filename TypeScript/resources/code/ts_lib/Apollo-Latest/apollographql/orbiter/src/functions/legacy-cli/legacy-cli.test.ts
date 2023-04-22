import { unwrappedHandler as handler } from "./legacy-cli";
import nock from "nock";

jest.mock("../../lib/sentry", () => ({
  initSentry: jest.fn(),
  sentryWrapHandler: jest.fn(() => {}),
}));

jest.mock("../../lib/track", () => ({
  track: jest.fn(),
}));

const GITHUB_RELEASE =
  "https://github.com/apollographql/apollo-tooling/releases";

beforeEach(() => {
  nock.cleanAll();
});

it("pulls from a version if passed", async () => {
  nock(GITHUB_RELEASE)
    .head("/download/apollo@0.0.1/apollo-v0.0.1-darwin-x64.tar.gz")
    .reply(200, "binary file");

  const res = await handler({
    path: "/legacy-cli/darwin/0.0.1",
  });

  expect(res.statusCode).toEqual(301);
  expect(res.body).toContain("Redirecting");
});

it("returns a 500 if no version is passed", async () => {
  nock(GITHUB_RELEASE)
    .head("/download/apollo@0.0.1/apollo-v0.0.1-darwin-x64.tar.gz")
    .reply(200, "binary file");

  const res = await handler({
    path: "/legacy-cli/darwin",
  });

  expect(res.statusCode).toEqual(400);
  expect(res.body).toContain("Missing");
});

it("returns a 500 if no platform is passed", async () => {
  nock(GITHUB_RELEASE)
    .head("/download/apollo@0.0.1/apollo-v0.0.1-darwin-x64.tar.gz")
    .reply(200, "binary file");

  const res = await handler({
    path: "/legacy-cli",
  });

  expect(res.statusCode).toEqual(400);
  expect(res.body).toContain("Missing");
});

it("returns a 500 if GitHub is down", async () => {
  nock(GITHUB_RELEASE)
    .head("/download/apollo@0.0.1/apollo-v0.0.1-darwin-x64.tar.gz")
    .reply(500, "lol no");

  const res = await handler({
    path: "/legacy-cli/darwin/0.0.1",
  });

  expect(res.statusCode).toEqual(500);
  expect(res.body).toContain("Internal Server Error");
});

it("returns a 500 if asking for a bad version", async () => {
  nock(GITHUB_RELEASE)
    .head(
      "/download/apollo@0.0.blblblblbblbl/apollo-v0.0.blblblblbblbl-darwin-x64.tar.gz"
    )
    .reply(500, "lol no");

  const res = await handler({
    path: "/legacy-cli/darwin/0.0.blblblblbblbl",
  });

  expect(res.statusCode).toEqual(500);
  expect(res.body).toContain("Internal Server Error");
});
