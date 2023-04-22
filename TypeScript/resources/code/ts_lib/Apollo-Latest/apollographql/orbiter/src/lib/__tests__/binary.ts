import nock from "nock";
import { Binary, InputVersion } from "../binary";
import { MalformedRequestError } from "../error";
import { downloadEvent } from "../download";

const INSTALLER_CONTENTS = "installer contents";

beforeEach(() => {
  if (!nock.isActive()) nock.activate();
  nock.cleanAll();
});

const nockGitHubLatest = (binary: Binary, version: string) => {
  let latestReleaseEndpoint = binary.repo.releaseUrl(
    new InputVersion("latest", binary.name)
  );
  let thisReleaseEndpoint = binary.repo.releaseUrl(
    new InputVersion(version, binary.name)
  );
  nock(latestReleaseEndpoint).head("").reply(302, undefined, {
    Location: thisReleaseEndpoint,
  });
};

const nockInstaller = (binary: Binary, version: string, platform: string) => {
  let githubInstallerEndpoint = binary.getInstallScriptUrl(platform, version);
  nock(githubInstallerEndpoint).head("").reply(200, INSTALLER_CONTENTS);
};

it("fetches latest version from a redirected url", async () => {
  let rover = new Binary("rover", "latest");
  let realVersion = "v0.99.99";
  let platform = "nix";
  nockGitHubLatest(rover, realVersion);
  nockInstaller(rover, realVersion, platform);
  const res = await downloadEvent(
    rover.name.toString(),
    platform,
    "latest",
    "installer"
  );
  let version = res.headers["X-Version"];
  let location = res.headers["Location"];
  expect(version).toEqual("v0.99.99");
  expect(location).toContain("v0.99.99");
});

it("returns proper version with /vx.x.x", async () => {
  let realVersion = "v0.99.99";
  let rover = new Binary("rover", realVersion);
  let platform = "nix";
  nockGitHubLatest(rover, realVersion);
  nockInstaller(rover, realVersion, platform);
  const res = await downloadEvent(
    rover.name.toString(),
    platform,
    realVersion,
    "installer"
  );
  let location = res.headers["Location"];
  let version = res.headers["X-Version"];
  expect(location).toContain("githubusercontent");
  expect(location).toContain("v0.99.99");
  expect(version).toEqual("v0.99.99");
});

it("errors when invalid platform passed", async () => {
  let realVersion = "v0.99.99";
  let platform = "myInvalidOS";

  let res = await downloadEvent("rover", platform, realVersion, "installer");
  expect(res.body).toContain("invalid");
  expect(res.statusCode).toEqual(400);
});

it("errors when invalid version passed", async () => {
  let version = "badbadversion";
  let platform = "nix";

  let res = await downloadEvent("rover", platform, version, "installer");
  expect(res.body).toContain("invalid");
  expect(res.statusCode).toEqual(400);
});
