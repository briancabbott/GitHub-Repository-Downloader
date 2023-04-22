# `oss-ci-cd-tooling` CircleCI Orb

This is the source for the `apollo/oss-ci-cd-tooling` [CircleCI Orb](https://circleci.com/orbs/).  Orbs are reusable bits of CircleCI configuration (e.g. commands, executors and jobs), which can be composed into a more complete CircleCI configuration without the repetition often found in CircleCI configuration files.

This repository has a single `oss-ci-cd-tooling` Orb which contains several of the jobs which we re-use within Apollo GraphQL repositories, like [Apollo Server](https://github.com/apollographql/apollo-server) and [Apollo Tooling](https://github.com/apollographql/apollo-tooling/) and [Apollo
Federation](https://github.com/apollographql/federation).

## Examples

To see how Apollo Server uses these orbs, see its
[`.circleci/config.yml`](https://github.com/apollographql/apollo-server/tree/master/.cirrcleci/config.yml).

## Releasing

The [`circleci` CLI
tool](https://circleci.com/docs/2.0/creating-orbs/#get-the-new-circleci-cli) is
used to release.  (If you use [direnv](https://direnv.net/), just run `direnv
allow` to install the CLI locally in the repo.) As an example, to publish a new
`apollo/oss-ci-cd-tooling` orb from its source in `src/oss-ci-cd-tooling` as
version `0.0.2`, one could run:

```
circleci orb publish src/oss-ci-cd-tooling/orb.yml apollo/oss-ci-cd-tooling@0.0.2
```

Alternatively, there's a `npm version <bumpish>` type command.  For example, to
publish and bump by a `patch`:

```
circleci orb publish increment src/oss-ci-cd-tooling/orb.yml apollo/oss-ci-cd-tooling patch
```

"Prerelease" versions like `1.2.3-beta.1` are not supported, but you can use a
version of the form `dev:any-string` for testing; these special dev releases
only last 90 days.

For more information, [see CircleCI's
documentation](https://circleci.com/docs/2.0/creating-orbs/).
