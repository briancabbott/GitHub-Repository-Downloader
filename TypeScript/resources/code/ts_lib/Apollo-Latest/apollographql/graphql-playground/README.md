> **NOTE:** This is a fork of `graphql-playground` which is meant to be used by Apollo Server.  It is not intended to be used directly.  Those looking to use GraphQL Playground directly can refer to [the upstream repository](https://github.com/prisma-labs/graphql-playground) for usage instructions.

> **SECURITY WARNING:** The upstream fork of `graphql-playground` repository **had a severe XSS Reflection attack vulnerability to unsanitized user input** prior to being fixed in `graphql-playground-html@1.6.20` (note, this is a different version than we publish from this fork on `@apollographql/graphql-playground-html`.  On the `@apollographql/graphql-playground-html` fork, versions prior to 1.6.25 were theoretically vulnerable if users were using those packages _directly_.  **However, the way this package was used by Apollo Server (to provide a default GraphQL Playground experience) did not provide the ability to users to have been dynamically exposed to the attack in the same way as the package's own usage instructions may have encouraged.**  In order for Apollo Server users to have been affected they would have to had instrumented the package _as a separate middleware_ or explicitly put vulnerable code into the static configuration of the `playground` property on the `ApolloServer` constructor.  Apollo Server does not provide any ability to do per-request playground configuration.  **Still, we have fixed this in `@apollographql/graphql-playground-html` version `1.6.25`.** [More details are available at the upstream repository](https://github.com/prisma-labs/graphql-playground/blob/20f0832bb8/SECURITY.md).

[![npm version](https://badge.fury.io/js/%40apollographql%2Fgraphql-playground-react.svg)](https://badge.fury.io/js/%40apollographql%2Fgraphql-playground-react)

**Future of this repository**: This fork aims to be deprecated, eventually.  For the upstream fork, see [their announcement issue](https://github.com/prisma-labs/graphql-playground/issues/1143) for details.

### Releasing

**Note:** You can omit the HTML **or** React package instructions below if you're not intending on publishing a package.

```sh
# Install it all.
yarn

# Build it all
#   Technically the release does the build too, but I enjoy the pre-flight test.
yarn run build

# Release the @apollographql/graphql-playground-react package.
./scripts/release-react.sh

# Release the @apollographql/graphql-playground-html package.
./scripts/release-html.sh

# Add the package files that were version bumped.
# You'll find that these were altered by the release scripts.
git add ./packages/graphql-playground-react/package.json
git add ./packages/graphql-playground-html/package.json

# It's nice to use the version numbers in the commit summary!
git commit -m 'Released' # e.g. 'Released -react@vX.Y.Z and -html@vA.B.C'. 

# Assuming your Git remote "origin" is https://github.com/apollographql/graphql-playground/
git push origin apollo
```
