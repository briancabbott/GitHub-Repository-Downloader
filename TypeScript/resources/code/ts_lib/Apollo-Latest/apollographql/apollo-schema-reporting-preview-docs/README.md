# [Developer Preview] Apollo Schema Reporting

**Apollo Schema Reporting** is a protocol (and an implementation of that protocol) that enables GraphQL servers to automatically register their schema with Apollo Graph Manager.

At Apollo, we want to help you track the evolution of your GraphQL schema over time. That's why we are previewing functionality to automatically report a schema definition from your running GraphQL server, which will be registered in your graph's version history in Apollo Graph Manager.

This repository provides early-access users with information about this new project and instructions to configure schema reporting, along with a central place to [provide feedback to the schema reporting team](https://github.com/apollographql/apollo-schema-reporting-preview-docs/issues/new).

## DISCLAIMER

**Apollo Schema Reporting is in active development.** It is not yet considered generally available or officially supported by Apollo. During this developer preview, the protocol and its implementation might change without notice. You are free to use both at your own risk, as described in the [Apollo Terms of Service](https://www.apollographql.com/Apollo-Terms-of-Service.pdf):

_PREVIEWS ARE PROVIDED "AS-IS," "WITH ALL FAULTS," AND "AS AVAILABLE," AND ARE EXCLUDED FROM ANY SERVICE LEVEL AGREEMENTS AND LIMITED WARRANTY. Previews may not be covered by customer support. Previews may be subject to reduced or different security, compliance and privacy commitments, as further explained in the Terms of Service, Privacy Policy and any additional notices provided with the Preview. We may change or discontinue Previews at any time without notice. We also may choose not to release a Preview into "General Availability."_

## Setup for Apollo Server

### Obtain and set your graph API key

To configure schema reporting for Apollo Server (supported in v2.14+ and later), you first provide Apollo Server a **graph API key** via the `APOLLO_KEY` environment variable. See [Pushing traces from Apollo Server](https://www.apollographql.com/docs/graph-manager/setup-analytics/#pushing-traces-from-apollo-server) to learn how to obtain this key. (If you've already configured metrics reporting, you can skip this step.)

### Opt in to schema reporting

While schema reporting is in developer preview, its functionality is opt-in. To opt in, set the following environment variable in your server's environment:

```sh
APOLLO_SCHEMA_REPORTING=true
```

Alternatively, pass the `experimental_schemaReporting` option to the `ApolloServer` constructor:

```js
new ApolloServer({
  engine: {
    experimental_schemaReporting: true,
  },
  ...
});
```

That's it! Now every time your server starts up, it automatically reports its schema to Graph Manager.

### Reporting a schema for a particular variant

Your server can optionally report its schema to a particular [variant of your graph](https://www.apollographql.com/docs/graph-manager/schema-registry/#managing-environments-with-variants). To set this up, set the `APOLLO_GRAPH_VARIANT` environment variable in your server's environment:

```sh
APOLLO_GRAPH_VARIANT=staging
```

If you don't specify a variant, Apollo Server reports its schema to the default variant (named `current`).

## Setup for other GraphQL servers

By providing a graph API key and a schema document to Graph Manager's schema reporting endpoint, any GraphQL server can report its schema to Graph Manager. If you want to add schema reporting support to a GraphQL server besides Apollo Server, we would love to hear from you and provide assistance in implementing the protocol.

To let us know, [open an issue on this repository](https://github.com/apollographql/apollo-schema-reporting-preview-docs/issues/new). Please include which server runtime you're interested in adding support to.

You can also get started on your own by:

* Reading the [schema reporting protocol](./schema-reporting-protocol.md)
* Consulting the [Apollo Server reference implementation](https://github.com/apollographql/apollo-server/pull/4084)

## Advanced topics

These sections describe the behavior of schema reporting in greater detail.

### The schema reporting endpoint

A server that implements the [schema reporting protocol](./schema-reporting-protocol.md) communicates with a GraphQL API hosted at `https://engine-graphql.apollographql.com/api/graphql`. This endpoint requires a [graph API key](https://www.apollographql.com/docs/graph-manager/setup-analytics/#pushing-traces-from-apollo-server) as authentication. 

Whenever your server (or a fleet of server instances) reports its schema, Apollo Graph Manager registers it as the latest schema for a specified variant of your graph. If different server instances report different schemas simultaneously, Graph Manager uses its **automatic promotion algorithm** to choose which schema to register:

1. If the specified variant does not currently have an active schema, choose the most recently reported schema.
2. If the specified variant _does_ have an active schema and that exact schema has been reported within the last 120 seconds (not configurable), do nothing.
3. If the specified variant has an active schema and that exact schema has _not_ been reported in the last 120 seconds, choose the most recently reported schema.
4. In all other cases, do nothing.

### Schema reporting and the Apollo CLI

The [Apollo CLI](https://www.apollographql.com/docs/devtools/cli/) provides a different mechanism for [registering a schema](https://www.apollographql.com/docs/graph-manager/schema-registry/#registering-a-schema-manually) to be active for a variant of a graph. If you currently use the `apollo service:push` command to register your schema, you can discontinue using the command entirely in favor of enabling schema reporting.

You _can_ use both the Apollo CLI and schema reporting together, but doing so can cause you to register "no-op" changes, in which the tools register schemas that are _semantically_ identical but _cosmetically_ different. For example, schema reporting preserves a schema's comments and directives, but the `apollo service:push` command does not.

### Customizing behavior in Apollo Server

By default, the schema reporting agent in Apollo Server uses the `GraphQLSchema` that's defined as a property of your `ApolloServer` instance (which is used to answer introspection requests). The agent reports the schema as a GraphQL document (commonly called SDL) using the schema reporting protocol. This default behavior should serve the large majority of use cases.

If necessary, however, you can modify certain schema reporting defaults and provide optional arguments. For a full list of optional arguments that the protocol accepts, see the [protocol documentation](./schema-reporting-protocol.md).

As one example, to report your server's `typeDefs` directly as a document instead of using the internally interpreted `GraphQLSchema`, provide the following option to the `ApolloServer` constructor:

```js
engine: {
	schemaReporting: {
		experimental_overrideReportedSchema: typeDefs.loc && typeDefs.loc.source.body,
	}
}
```
