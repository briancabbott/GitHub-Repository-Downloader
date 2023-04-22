# Orb Template

<!---
[![CircleCI Build Status](https://circleci.com/gh/apollographql/internal-platform-orb.svg?style=shield "CircleCI Build Status")](https://circleci.com/gh/apollographql/internal-platform-orb) [![CircleCI Orb Version](https://badges.circleci.com/orbs/apollo/internal-platform-orb.svg)](https://circleci.com/orbs/registry/orb/apollo/internal-platform-orb) [![GitHub License](https://img.shields.io/badge/license-MIT-lightgrey.svg)](https://raw.githubusercontent.com/apollographql/internal-platform-orb/master/LICENSE) [![CircleCI Community](https://img.shields.io/badge/community-CircleCI%20Discuss-343434.svg)](https://discuss.circleci.com/c/ecosystem/orbs)

--->

An orb full of useful code we've developed at Apollo GraphQL, and we're open-sourcing for community use.

---

## Resources

[CircleCI Orb Registry Page](https://circleci.com/developer/orbs/orb/apollo/internal-platform-orb) - The official registry page of this orb for all versions, executors, commands, and jobs described.

[CircleCI Orb Docs](https://circleci.com/docs/2.0/orb-intro/#section=configuration) - Docs for using, creating, and publishing CircleCI Orbs.

### How to Contribute

Important note: this is not an officially supported project of Apollo GraphQL. You're welcome to use, and see how we do things internally, but support or pull requests are answered on a as-availible basis.

If you do have [issues](https://github.com/apollographql/internal-platform-orb/issues), or[pull requests](https://github.com/apollographql/internal-platform-orb/pulls) feel free, but...

Also please add an entry to the changelog!

### How to test PRs
1. Create and push a branch with your new features.
2. A build will automatically happen in Circle. In the `test-pack` workflow there's a `Publish Dev version` job, and the `Publish Orb Release` step within that job. Find text in that output about "Orb apollo/internal-platform-orb@dev:SHA`.
3. Copy/paste that `@dev:SHA1` info into the config.yml you're using this orb from.
4. Test the orb
5. Upon merge of the PR update the config.yml from step 3 to be the correct and published version, as `dev` tags last only 90 days.

### Notes on Publishing a new version

Upon merge of a PR we use [nextgen-versioning orb](https://circleci.com/developer/orbs/orb/mybudget-dev/nextgen-versioning) will automatically increase the patch level version of the latest tag, and tag the commit.

This tagging will triggered CircleCI again which will publish the orb

"But what if I have a minor/major breaking changes?"

You may have to manually create your new tag, ideally before merging the PR, then let the system take over from there. Slightly limitation of the nextgen-versioning orb we're using.
