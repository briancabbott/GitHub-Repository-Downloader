# Apollo Schema Reporting Protocol

This document specifies the protocol that any GraphQL server can implement to register its schema with [Apollo Graph Manager](https://www.apollographql.com/docs/graph-manager/).

A reference implementation of this protocol is included in [Apollo Server](https://github.com/apollographql/apollo-server/pull/4084/files).

## Protocol sequence

The following diagram illustrates the communication sequence for a GraphQL server (hereafter referred to as the **edge server**) reporting its schema to Apollo Graph Manager (**Apollo**):

![Schema Reporting Protocol](./schema-reporting-protocol.png "request / response between an edge server and the Apollo schema registry")

1. The edge server calls `reportServerInfo`, providing an `EdgeServerInfo` object with the server's details as input.
    * The edge server **does not** include an `executableSchema` string in this request.
    * The edge server **does** include an `executableSchemaId` in the `EdgeServerInfo` input. This is the SHA-256 hash of the edge server's schema, represented as a hexadecimal string. 
    * If this or any other `reportServerInfo` request fails with a non-2xx response from Apollo, the edge server should retry after 20 seconds.
2. Apollo responds with a `ReportServerInfoResponse`. This response tells the edge server: 
    * How many seconds to wait before sending the next `reportServerInfo` request
    * Whether the next `reportServerInfo` request should include the `executableSchema` that corresponds to the `executableSchemaId` provided in the previous request.
3. After waiting the specified number of seconds, the edge server calls `reportServerInfo` again. This request includes an `executableSchema` string if and only if `withExecutableSchema` was `true` in Apollo's most recent `ReportServerInfoResponse`.
4. Go to step 2.

## Type definitions

The schema reporting protocol uses the following GraphQL types, referred to in [Protocol sequence](#protocol-sequence) above:

```graphql
# This type's fields are documented below.
input EdgeServerInfo {
  bootId: String!
  executableSchemaId: String!
  graphVariant: String! = "current"
  libraryVersion: String
  platform: String
  runtimeVersion: String
  serverId: String
  userVersion: String
}

type ReportServerInfoResponse {
  inSeconds: Int!
  withExecutableSchema: Boolean!
}

type Mutation {
  service(id: ID!): ServiceMutation!
}

type ServiceMutation {
  reportServerInfo(
    "Only sent if previously requested i.e. received ReportServerInfoResponse with withExecutableSchema = true"
    executableSchema: String,
    info: EdgeServerInfo!
  ): ReportServerInfoResponse
}
```

## `EdgeServerInfo` fields

### Required fields

| Name  | Type | Description  |
|---|---|---|
| `bootId` | `String!` | A randomly generated UUID that's unique for each instance of your edge server. Set this value on server startup (a given value should not persist across restarts). |
| `executableSchemaId` | `String!` | A unique identifier for the edge server's schema. Should be the hex representation of the schema document's SHA-256 hash. |

### Recommended fields

| Name  | Type | Description  |
|---|---|---|
| `graphVariant` | `String!` | The name of the graph variant to register the schema to. The default value is `current`. |
| `serverId` | `String` | A randomly generated ID that's unique for each instance of your edge server. Unlike `bootId`, this value _should_ persist across an instance's restarts. In a Kubernetes cluster, this might be the **pod name**, whereas the **container** can restart. |
| `userVersion` | `String` | An arbitrary string you can set to distinguish data sent by different versions of your edge server. For example, this can be the SHA of the Git commit for your deployed server code. We plan to make this value visible in Graph Manager. |

### Appreciated fields 🙂

By providing these values in your requests, you'll help Apollo improve its service. For example, they'll help us identify whether a certain environment, platform, or version is causing a particular issue.

| Name  | Type | Description  |
|---|---|---|
| `runtimeVersion` | `String` | The runtime that your edge server is running, such as `node 12.03`.
| `libraryVersion` | `String` | The name and version of the server and/or reporting agent your edge server is using, such as `apollo-server-2.8` or `graphql-java-3.1`. | 
| `platform` | `String` | The infrastructure environment that your edge server is running in (`localhost`, `kubernetes/deployment`, `aws lambda`, `google cloud run`, `google cloud function`, `AWS ECS`, etc.) |

## Schema normalization

Two semantically identical schemas can look different to Graph Manager, for example if you rearrange the order of an object type's fields. To avoid this, all edge servers should **normalize** their schema before sending it to Graph Manager.

To normalize your schema, do all of the following:

* Apply stable sorting (such as alphabetical) to the order of all type, field, and argument definitions.
* Remove all redundant whitespace.
* Remove all comments (but not docstrings).

Runtime dependencies on your schema document might result in poor user experience in tracking your schema changes, or even throttling of service availability.

### Pseudocode example

```
val info = EdgeServerInfo(..)
val schema = normalize("type Query { .. }")
var withSchema = false

function sendReport() {
  val executableSchema = if (withSchema) null else schema
  val response = reportServerInfo(info, executableSchema)

  if (response.withExecutableSchema) {
    withSchema = true
  }

  setTimeout(sendReport, response.inSeconds)
}

sendReport()
```
