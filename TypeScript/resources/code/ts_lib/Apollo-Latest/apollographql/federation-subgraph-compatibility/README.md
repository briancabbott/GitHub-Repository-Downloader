# Apollo Federation Subgraph Compatibility Action

[![Marketplace](https://img.shields.io/badge/Github-Marketplace-orange)](https://github.com/marketplace/actions/apollo-federation-subgraph-compatibility)
[![Continuous Integration](https://github.com/apollographql/federation-subgraph-compatibility/workflows/Continuous%20Integration/badge.svg)](https://github.com/apollographql/federation-subgraph-compatibility/actions?query=workflow%3A"Continuous+Integration")
[![Join the community forum](https://img.shields.io/badge/Join%20The%20Community-Forum-blueviolet)](https://community.apollographql.com)
[![MIT License](https://img.shields.io/github/license/apollographql/federation-subgraph-compatibility)](https://github.com/apollographql/federation-subgraph-compatibility/blob/main/LICENSE)

`federation-subgraph-compatibility` is a Github Action that allows you to run [Apollo Federation Subgraph Specification](https://www.apollographql.com/docs/federation/subgraph-spec/) compatibility tests against your test subgraph implementation. See [compatibility testing docs](https://github.com/apollographql/apollo-federation-subgraph-compatibility/blob/main/COMPATIBILITY.md) for details on the expected schema and the data sets as well as information about the executed tests.

If action is used on PR workflows, compatibility results can be posted on the PR (requires passing in Github Token to the configuration).

## Usage

```yaml
- uses: apollographql/federation-subgraph-compatibility@v1
  with:
    # [Required] Docker Compose file to start up the subgraph
    compose: 'path/to/docker-compose.yaml'
    # [Required] Path to the GraphQL schema file
    schema: 'path/to/schema.graphql'
    # GraphQL endpoint path, defaults to '' (empty)
    path: ''
    # GraphQL endpoint HTTP port, defaults to 4001
    port: 4001
    # Turn on debug mode with extra log info
    debug: false
    # Github Token / PAT for submitting PR comments
    token: ''
    # Boolean flag to indicate whether any failing test should fail the script
    failOnWarning: false
    # Boolean flag to indicate whether any failing required functionality test should fail the script
    failOnRequired: false
    # Working directory to run the action from. Should be relative from the root of the project.
    workingDirectory: ''
```

## Known Limitations

### Default GITHUB_TOKEN doesn't work with forks

Due to the security reasons, maximum `GITHUB_TOKEN` permission is set to **read** for PRs from public forked repositories ([source](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#permissions-for-the-github_token)). If you want to run this action against PRs from forked repositories you will need to use Personal Access Token that was generated with appropriate permissions. See [Github documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) for more details.

## Release

This project is released through Github Actions. To release a new version simply run [release workflow](https://github.com/apollographql/federation-subgraph-compatibility/actions/workflows/release.yaml) with a target release version. Release workflow will automatically cut a new branch and tag the release.

## Contact

If you have a specific question about the testing library or code, please start a discussion in the [Apollo community forums](https://community.apollographql.com/).

## Security

For more info on how to contact the team for security issues, see our [Security Policy](https://github.com/apollographql/federation-subgraph-compatibility/security/policy).

## License

This library is licensed under [The MIT License (MIT)](./LICENSE).
