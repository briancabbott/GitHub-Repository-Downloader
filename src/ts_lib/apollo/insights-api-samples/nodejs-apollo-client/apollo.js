const gql = require("graphql-tag");
const ApolloClient = require("apollo-client").ApolloClient;
const fetch = require("node-fetch");
const createHttpLink = require("apollo-link-http").createHttpLink;
const setContext = require("apollo-link-context").setContext;
const InMemoryCache = require("apollo-cache-inmemory").InMemoryCache;

const getHeaders = require("./auth");

const httpLink = createHttpLink({
  uri: "https://insights.opentok.com/graphql",
  fetch: fetch
});

const authLink = setContext((_, { headers }) => {
  const authHeaders = getHeaders();
  // return the headers to the context so httpLink can read them
  return {
    headers: authHeaders
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const apollo = async (req, res, next) => {
  switch (req.method) {
    case "POST":
    case "PUT":
      await mutate(req, res);
      break;

    case "GET":
    default:
      await query(req, res);
  }

  next();
};

const query = async (req, res) => {
  if (!req.body || !req.body.query) {
    res.sendStatus(500);
    return;
  }

  const query = gql(req.body.query);
  let variables = undefined;
  if (req.body.variables) {
    variables = JSON.parse(decodeURIComponent(req.body.variables));
  }

  try {
    const result = await client.query({
      query,
      variables
    });
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500).send(JSON.stringify(err));
  }
};

const mutate = async (req, res) => {
  if (!req.body || !req.body.query) {
    res.sendStatus(500);
    return;
  }

  const query = gql(req.body.query);
  let variables = undefined;
  if (req.body.variables) {
    variables = JSON.parse(decodeURIComponent(req.body.variables));
  }

  try {
    const result = await client.mutate({
      query,
      variables
    });
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500).send(JSON.stringify(err));
  }
};

module.exports = apollo;
