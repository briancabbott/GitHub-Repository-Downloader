<img src="https://raw.githubusercontent.com/apollographql/space-kit/main/src/illustrations/svgs/satellite2.svg" width="100%" height="144">

# Orbiter

This folder contains the code that powers the [Netlify Functions](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjRmPfBh5rvAhUxxVkKHaeNBlYQFjAAegQIERAD&url=https%3A%2F%2Fwww.netlify.com%2Fproducts%2Ffunctions%2F&usg=AOvVaw0WgqqN2xZx2ARRVLWP61oD) which are responsible for installing and telemetry reporting for [Rover](https://github.com/apollographql/rover).

The functions run from this project provide install and telemetry services for [Rover](https://github.com/apollographql/rover) and a single download url for version of the Darwin build of the [apollo cli](https://github.com/apollographql/apollo-tooling).

There are five functions included to be aware of:

* __[install-rover](./src/functions/install-rover)__: Responsible for serving redirects to cross-platform installation scripts [hosted on GitHub](https://github.com/apollographql/rover/tree/main/installers/binstall/scripts) for the [Rover CLI](https://github.com/apollographql/rover). A [`/bin/sh` script](https://github.com/apollographql/rover/blob/main/installers/binstall/scripts/nix/install.sh) for nix systems, and a [PowerShell script](https://github.com/apollographql/rover/blob/main/installers/binstall/scripts/windows/install.ps1) for Windows.
* __[download-router](./src/functions/download-router)__: Responsible for serving redirects to a `/bin/sh` download script for *nix systems that is [hosted on GitHub](https://github.com/apollographql/router/blob/main/scripts/install.sh) for the [Apollo Router](https://github.com/apollographql/router).  There is no Windows downloader at this time.
* __[install-plugin](./src/function/install-plugin)__: Responsible for serving redirects to cross-platform installation scripts hosted on GitHub for the now-deprecated `rover-fed2` plugin. All Rover plugins after v0.5.0 are downloaded from the `/tar` endpoint, and only a few versions of `rover-fed2` were built, the last of which was v0.4.8. ([nix](https://github.com/apollographql/rover/blob/v0.4.8/installers/binstall/scripts/nix/install_rover_fed2.sh), [windows](https://github.com/apollographql/rover/blob/v0.4.8/installers/binstall/scripts/windows/install_rover_fed2.ps1))
* __[legacy-cli](./src/functions/legacy-cli/)__: Responsible for serving and tracking downloads of the legacy [apollo cli](https://github.com/apollographql/apollo-tooling) tarball.
* __[tar](./src/functions/tar/)__: Responsible for serving redirects to cross-platform tarballs hosted on GitHub. Currently the only binaries served from this endpoint are [`rover`](https://github.com/apollographql/rover/releases), [`supergraph`](https://github.com/apollographql/federation-rs/releases), and eventually the [`router`](https://github.com/apollographql/router/releases).
* __[telemetry](./src/functions/telemetry/)__: This folder contains the function responsible for consuming telemetry reports from Rover and reporting them to Apollo Studio API via the [`roverTrackMutation`](./src/lib/operations/track.mutation.graphql).

## Cross-platform Installers for Rover

Rover can be installed via two separate install scripts, one for windows users (`.ps1`) and another for unix users (`.sh`).

Rather than pointing users to a raw file path to find these scripts, which are versioned and released alongside the rover source, these functions provide endpoints to download the latest install _script_, and allow for overriding instructions in that script to install different versions of the Rover runtime.

These functions don't allow for use of older install scripts to allow the Rover team to continually improve the install scripts, even for users of previous versions of Rover. Of course, old scripts are always available in the git history.

When running, these two functions will expose two endpoints under `/nix` and `/win`, which users can `curl` or `iwr` respectively to fetch a script.

### Versions

To choose a different version, the user passes a version prefixed with a `v`. (ex. `https://rover.apollo.dev/nix/v0.5.0`).

## Tarball endpoints (used for plugins)

The endpoint looks like this: `https://rover.apollo.dev/tar/{name}/{target_triple}/{version}`.

Valid names are `rover` and `supergraph`.

Valid target triples are as follows:

||`x86_64-unknown-linux-gnu`|`x86_64-unknown-linux-musl`|`x86_64-apple-darwin`|`x86_64-pc-windows-msvc`|`aarch64-unknown-linux-gnu`|`aarch64-apple-darwin`|
|---|---|---|---|---|---|---|
|rover|✅|✅|✅|✅|✅|✅|
|supergraph|✅|❌|✅|✅|✅|❌|
|router|✅|❌|✅|✅|✅|❌|

Valid versions are as follows:

||`v{version}` (i.e. v2.0.0)|`latest`|`latest-0`|`latest-2`|
|---|---|---|---|---|
|router|✅|✅|❌|❌|
|rover|✅|✅|❌|❌|
|supergraph|✅|❌|✅|✅|
|router|✅|❌|❌|❌|

> **Note**
> `router` is only downloadable _after_ `v1.0.0-alpha.0`

In order to provide two separate major version channels for the `supergraph` binary, we have a `latest-0` and a `latest-2` version tag instead of the usual `latest`. These versions are sourced from the message of the corresponding git tag [`composition-latest-0`](https://github.com/apollographql/federation-rs/releases/tag/composition-latest-0) and [`composition-latest-2`](https://github.com/apollographql/federation-rs/releases/tag/composition-latest-2).

## Telemetry

The telemetry function is a single endpoint for reporting metrics from [Rover](https://github.com/apollographql/rover). Currently, this function reports all metrics to [studio-staging](https://studio-staging.apollographql.com) using the [track util](./src/lib/track.ts).

When running, this endpoint accepts POST requests, and requires you to pass `User-Agent: rover*` and `Content-Type: application/json` headers.

The payload shape looks like the following:

```json
{
    "machine_id": "UNIQUE",
    "cli_version": "v0.0.2",
    "session_id": "UNIQUE",
    "cwd_hash": "ghgfj4h",
    "platform": { "os": "windows", "continuous_integration": "ci-provider or null" },
    "command": { "name": "subgraph check", "args": {"validation_period": null, "query_count_threshold": null } }
}
```

For full reporting of telemetry to work, you must have a `STUDIO_API_KEY` environment variable set. In prod, we set `NODE_ENV=production`, we have a `GH_TOKEN` from the `apollo-bot2` account so we aren't rate limited, and we have a `SENTRY_DSN` that we use to track errors.

## Legacy CLI

The legacy cli function is a thin wrapper around the release tarball generated when releasing the [apollo cli](https://github.com/apollographql/apollo-tooling). The main purposes of this function are to:

1. Provide a static url that we control, to serve the apollo cli's tarball. This way we can add custom caching (TBD).
2. Track downloads of the tarball, giving us insight into our apollo-ios userbase.

When running, this function accepts a redirect from any `/legacy-cli/*` route, but will fail unless there is a `platform` and `version` defined in the url path. For example, `http://localhost:8888/legacy-cli/darwin/2.32.1`.

The `platform` is largely for tracking purposes, as we currently only support the `darwin` download. No matter the `platform` provided, we will download the same `darwin` tarball.

## Local Development

Local development of the functions is done using the [`netlify-cli`](https://www.npmjs.com/package/netlify-cli). To run the project locally you will first need to install the projects depedencies:

```sh
npm i
```

After you have these installed, you can run the project using the following command:

```sh
npm start
```

This will run `tsc --watch` and `netlify dev` concurrently, which will serve functions under the following routes:

- [`http://localhost:8888/nix`](http://localhost:8888/nix) <span style="color:#28a745">[GET]</span>
- [`http://localhost:8888/win`](http://localhost:8888/win) <span style="color:#28a745">[GET]</span>
- [`http://localhost:8888/telemetry`](http://localhost:8888/telemetry) <span style="color:#28a745">[POST]</span>
- [`http://localhost:8888/legacy-cli`](http://localhost:8888/legacy-cli) <span style="color:#28a745">[GET]</span>

All file changes will be watched and reloaded, so you shouldn't have to restart the server.

For full reporting of telemetry to work, you must have a `SEGMENT_API_KEY` set.

## Testing

Not implemented yet

## Releases

Releasing a new build of the functions is managed through GitHub and Netlify. When a PR is merged to main, Netlify will kick off a build and deploy of the functions.

## Runbook

The functions are instrumented with [Sentry](https://sentry.io) alerting. Those responsible for this code are: 

* [@EverlastingBugstopper](https://github.com/EverlastingBugstopper)
* [@lrlna](https://github.com/lrlna)

<!-- TODO -->
<!-- is monitored by [Datadog](https://www.datadoghq.com/), and is wired up to [PagerDuty](https://pagerduty.com). The current on call team is comprised of: -->

<!-- 
These functions are connected to our [status page](https://status.apollographql.com) with both uptime and latency reporting in place for our users. -->

### Potential Problems
> As problems arise, please add instructions here of what to do if there is a problem with the CDN

__404 when installing a package__:

If there is an elevated number of `404`s happening check the `Releases` tab of either the [Rover releases](https://github.com/apollographql/rover/releases) or the [Router releases](https://github.com/apollographql/router/releases) pages to ensure that the release in question (typically "latest") has all of its tarballs for each platform. There should be three tarballs present. If there aren't, you will need to cut a new release or manually build the tarballs.

<img src="https://raw.githubusercontent.com/apollographql/space-kit/main/src/illustrations/svgs/moon.svg" width="100%" height="144">
