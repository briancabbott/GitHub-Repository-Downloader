import { unwrappedHandler as handler } from "./install-rover";
import nock from "nock";

jest.mock("../../lib/sentry", () => ({
  initSentry: jest.fn(),
  sentryWrapHandler: jest.fn(() => {}),
}));

jest.mock("../../lib/track", () => ({
  track: jest.fn(),
}));

const buildInstallUrl = (downloadVersion) =>
  `https://raw.githubusercontent.com/apollographql/rover/${downloadVersion}/installers/binstall/scripts/nix/install.sh`;

beforeEach(() => {
  nock.cleanAll();
});

it("pulls from a version if passed", async () => {
  const res = await handler(
    {
      path: "/nix/v0.0.1",
    },
    null,
    null
  );

  expect(res.statusCode).toEqual(302);
  expect(res.headers["X-Version"]).toEqual("v0.0.1");
  expect(res.headers["Location"]).toContain("v0.0.1");
});

it("returns a 400 if no version is passed", async () => {
  const res = await handler({
    path: "/nix",
  });

  expect(res.statusCode).toEqual(400);
  expect(res.body).toContain("version");
});

it("returns a 400 if no platform is passed", async () => {
  const res = await handler({
    path: "/",
  });

  expect(res.statusCode).toEqual(400);
  expect(res.body).toContain("platform");
});

it("returns a 500 if GitHub is down", async () => {
  nock(buildInstallUrl("v0.0.1")).head("").reply(500, "oh noe big err");

  const res = await handler({
    path: "/nix/v0.0.1",
  });

  expect(res.statusCode).toEqual(500);
  expect(res.body).toContain("Internal Server Error");
});

it("returns a 400 if asking for a bad version", async () => {
  nock(buildInstallUrl("0.0.1")).head("").reply(500, "oh noe big err");

  // note the missing `v`
  const res = await handler({
    path: "/nix/0.0.1",
  });

  expect(res.statusCode).toEqual(400);
  expect(res.body).toContain("invalid version");
});

it("returns a 404 if asking for a nonexistent version", async () => {
  nock(buildInstallUrl("v0.0.999")).head("").reply(404, "lol not found");

  const res = await handler({
    path: "/nix/v0.0.999",
  });

  expect(res.statusCode).toEqual(404);
  expect(res.body).toContain("couldn't find a GitHub release");
});
