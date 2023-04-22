import { Fetcher } from "make-fetch-happen";
import {
  InternalServerError,
  MalformedRequestError,
  NotFoundError,
} from "./error";
import { getFetcher } from "./getFetcher";

export class Binary {
  name: BinaryName;
  repo: Repo;
  inputVersion: InputVersion;

  constructor(inputBinaryName: string, inputVersion: string) {
    this.name = enumFromStringValue(BinaryName, inputBinaryName);
    this.inputVersion = new InputVersion(inputVersion, this.name);
    this.repo = new Repo(this.name);
  }

  private getReleaseTagName(version: string): string {
    let tagName: string;
    switch (this.name) {
      case BinaryName.Router:
      case BinaryName.Rover:
      case BinaryName.RoverFed2:
        tagName = version;
        break;
      case BinaryName.Supergraph:
        tagName = encodeURIComponent(`supergraph@${version}`);
        break;
      default:
        throw new MalformedRequestError(
          `invalid binary name '${
            this.name
          }'. possible names are ${possibleValues(BinaryName)}`
        );
    }
    return tagName;
  }

  private getReleaseTarballName(
    inputTargetTriple: string,
    version: string
  ): string {
    let targetTriple = enumFromStringValue(TargetTriple, inputTargetTriple);
    if (
      targetTriple === TargetTriple.AppleArm &&
      (this.name === BinaryName.Supergraph || this.name === BinaryName.Router)
    ) {
      throw new MalformedRequestError(
        `invalid target '${targetTriple}' for '${this.name}' binary, you should download the 'x86_64-apple-darwin' target instead and it will work on Mac machines with Apple's ARM processor via emulation.`
      );
    }
    return `${this.name}-${version}-${targetTriple}.tar.gz`;
  }

  getReleaseTarballUrl(inputTargetTriple: string, version: string): string {
    return `https://github.com/${
      this.repo.slug
    }/releases/download/${this.getReleaseTagName(
      version
    )}/${this.getReleaseTarballName(inputTargetTriple, version)}`;
  }

  async getFullyQualifiedRoverVersion(fetch: Fetcher): Promise<string> {
    let versionUrl = this.versionUrl();
    let response = await fetch(versionUrl, {
      method: "HEAD",
      redirect: "manual",
    });
    if (response?.status === 301 || response?.status === 302) {
      let realLatestUrl = response.headers.get("location");
      // https:, , github.com, apollographql, rover, releases, v0.99.99
      const urlComponents = realLatestUrl?.split("/");
      // grab the last element
      const latestVersion = urlComponents?.pop();
      if (!latestVersion) {
        throw new NotFoundError("could not get latest version");
      }
      return latestVersion;
    } else if (response.status === 404) {
      throw new NotFoundError(
        `could not find release. ${versionUrl} returned 404`
      );
    } else {
      throw new InternalServerError(
        `something went wrong while fetching ${versionUrl}`
      );
    }
  }

  async getFullyQualifiedSupergraphVersion(
    fetch: Fetcher,
    version: string
  ): Promise<string> {
    // supergraph is a bit weird because we have a "latest" for fed 1 _and_ for fed 2
    // the source of truth for these is on the `main` branch of https://github.com/apollographql/rover in the ./latest_plugin_versions.json file
    let latestPluginVersions = await fetch(
      "https://raw.githubusercontent.com/apollographql/rover/main/latest_plugin_versions.json"
    );
    let supergraphJson = await latestPluginVersions.json();
    let supergraphVersions = supergraphJson["supergraph"]["versions"];
    let latestTag: string;
    if (version === "latest-0") {
      latestTag = supergraphVersions["latest-0"];
    } else if (version === "latest-2") {
      latestTag = supergraphVersions["latest-2"];
    } else {
      throw new MalformedRequestError(
        `invalid version '${this.inputVersion}'. must be 'latest-0', 'latest-2', or in semver form 'v0.0.0'`
      );
    }
    // let's verify that the message is looking good
    if (latestTag?.startsWith("v")) {
      return latestTag;
    } else {
      throw new InternalServerError(
        `version from tag ${latestTag} is malformed`
      );
    }
  }

  async getFullyQualifiedRouterVersion(
    fetch: Fetcher,
    version: string
  ): Promise<string> {
    let latestTag: string;
    // for the "latest" router, we query github releases to get the most recent release
    if (version === "latest") {
      let versionUrl = this.versionUrl();
      let response = await fetch(versionUrl, {
        method: "HEAD",
        redirect: "manual",
      });
      if (response?.status === 301 || response?.status === 302) {
        let realLatestUrl = response.headers.get("location");
        // https:, , github.com, apollographql, router, releases, v0.99.99
        const urlComponents = realLatestUrl?.split("/");
        // grab the last element
        const latestVersion = urlComponents?.pop();
        if (!latestVersion) {
          throw new NotFoundError("could not get latest version");
        }
        return latestVersion;
      } else if (response.status === 404) {
        throw new NotFoundError(
          `could not find release. ${versionUrl} returned 404`
        );
      } else {
        throw new InternalServerError(
          `something went wrong while fetching ${versionUrl}`
        );
      }
      // rover will request this latest-plugin version to use the version specified in latest_plugin_versions.json
    } else if (version === "latest-plugin") {
      // the source of truth for the latest router versions is on the `main` branch of https://github.com/apollographql/rover in the ./latest_plugin_versions.json file
      let latestPluginVersions = await fetch(
        "https://raw.githubusercontent.com/apollographql/rover/main/latest_plugin_versions.json"
      );
      let supergraphJson = await latestPluginVersions.json();
      let supergraphVersions = supergraphJson["router"]["versions"];
      latestTag = supergraphVersions["latest-1"];
    } else {
      throw new MalformedRequestError(
        `invalid version '${this.inputVersion}'. must be 'latest', 'latest-plugin' or in semver form 'v0.0.0'`
      );
    }
    // let's verify that the message is looking good
    if (latestTag?.startsWith("v")) {
      return latestTag;
    } else {
      throw new InternalServerError(
        `version from tag ${latestTag} is malformed`
      );
    }
  }

  async getFullyQualifiedVersion(): Promise<string> {
    let fetcher = getFetcher();
    let version = this.inputVersion.toString();
    if (version.startsWith("v")) {
      return version;
    }

    if (!version.startsWith("latest")) {
      throw new InternalServerError(
        "an unknown error occurred while getting fully qualified version"
      );
    }

    switch (this.name) {
      case BinaryName.Router:
        return this.getFullyQualifiedRouterVersion(fetcher, version);
      case BinaryName.Rover:
        return this.getFullyQualifiedRoverVersion(fetcher);
      case BinaryName.RoverFed2:
        // rover_fed2@v0.4.8 was the latest version ever released for this plugin
        return "v0.4.8";
      case BinaryName.Supergraph:
        return this.getFullyQualifiedSupergraphVersion(fetcher, version);

      default:
        throw new MalformedRequestError(
          `invalid binary name '${
            this.name
          }'. possible names are ${possibleValues(BinaryName)}`
        );
    }
  }

  getInstallScriptUrl(inputTargetPlatform: string, version: string): string {
    let targetPlatform = enumFromStringValue(
      TargetPlatform,
      inputTargetPlatform
    );
    let installerFileExtension = null;
    let installerPlatform = null;
    switch (targetPlatform) {
      case TargetPlatform.Nix:
        installerFileExtension = ".sh";
        installerPlatform = "nix";
        break;
      case TargetPlatform.Windows:
        installerFileExtension = ".ps1";
        installerPlatform = "windows";
        break;
    }

    if (!installerFileExtension || !installerPlatform) {
      throw new MalformedRequestError(
        "could not determine the correct URL for this platform"
      );
    }

    switch (this.name) {
      case BinaryName.Router:
        return `https://raw.githubusercontent.com/${this.repo.slug}/${version}/scripts/install.sh`;
      case BinaryName.Rover:
        return `https://raw.githubusercontent.com/${this.repo.slug}/${version}/installers/binstall/scripts/${installerPlatform}/install${installerFileExtension}`;
      case BinaryName.RoverFed2:
        return `https://raw.githubusercontent.com/${this.repo.slug}/${version}/installers/binstall/scripts/${installerPlatform}/install_rover_fed2${installerFileExtension}`;
      case BinaryName.Supergraph:
        throw new MalformedRequestError(
          "The supergraph binary does not have an install script. You must download the tarball instead."
        );
      default:
        throw new MalformedRequestError(
          `invalid binary name '${
            this.name
          }'. possible names are ${possibleValues(BinaryName)}`
        );
    }
  }

  versionUrl(): string {
    return this.repo.releaseUrl(this.inputVersion);
  }
}

enum BinaryName {
  Router = "router",
  Rover = "rover",
  Supergraph = "supergraph",
  RoverFed2 = "rover-fed2",
}

enum TargetTriple {
  AppleAmd = "x86_64-apple-darwin",
  AppleArm = "aarch64-apple-darwin",
  LinuxAmdGnu = "x86_64-unknown-linux-gnu",
  LinuxAmdMusl = "x86_64-unknown-linux-musl",
  LinuxArm = "aarch64-unknown-linux-gnu",
  WindowsAmd = "x86_64-pc-windows-msvc",
}

export enum TargetPlatform {
  Nix = "nix",
  Windows = "win",
}

class Repo {
  org: string;
  name: string;
  slug: string;

  constructor(binaryName: BinaryName) {
    this.org = "apollographql";
    let repoName = null;

    switch (binaryName) {
      case BinaryName.RoverFed2:
      case BinaryName.Rover:
        repoName = "rover";
        break;
      case BinaryName.Router:
        repoName = "router";
        break;
      case BinaryName.Supergraph:
        repoName = "federation-rs";
        break;
      default:
        throw new MalformedRequestError(
          `invalid binary name '${binaryName}'. Possible names are ${possibleValues(
            BinaryName
          )}`
        );
    }

    this.name = repoName;
    this.slug = `${this.org}/${repoName}`;
  }

  releaseUrl(version: InputVersion): string {
    return `${this.toString()}/releases/${version.toString()}`;
  }

  toString(): string {
    return `https://github.com/${this.slug}`;
  }
}

export class InputVersion {
  descriptor: string;

  constructor(inputVersion: string, binaryName: BinaryName) {
    let version = inputVersion.toLowerCase();
    let isExactVersionTag =
      version.startsWith("v") && version.split(".").length >= 2;
    if (version == "latest" || isExactVersionTag) {
      this.descriptor = version;
    } else if (
      binaryName === BinaryName.Supergraph &&
      (version === "latest-0" || version === "latest-2")
    ) {
      this.descriptor = version;
    } else if (
      binaryName === BinaryName.Router &&
      version === "latest-plugin"
    ) {
      this.descriptor = version;
    } else {
      throw new MalformedRequestError(
        `invalid version '${inputVersion}'. versions must be 'latest' or in semver form 'v0.0.0'.`
      );
    }
  }

  toString(): string {
    return this.descriptor;
  }
}

function possibleValues<O extends object>(obj: O): string[] {
  let values: string[] = [];
  Object.values(obj)
    .filter((k) => typeof k === "string")
    .map((k) => values.push(k));
  return values;
}

export function enumFromStringValue<T>(
  enm: { [s: string]: T },
  value: string
): T {
  const values: string = possibleValues(enm).toString().split(",").join(", ");
  if ((Object.values(enm) as unknown as string[]).includes(value)) {
    return value as unknown as T;
  } else {
    throw new MalformedRequestError(
      `invalid input '${value}', must be one of: ${values}`
    );
  }
}
