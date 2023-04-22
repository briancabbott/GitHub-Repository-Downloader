const {ApolloServer, gql} = require('apollo-server');
const {buildSubgraphSchema} = require('@apollo/subgraph');
const {readFileSync} = require('fs');

const typeDefs = gql(readFileSync('./locations.graphql', {encoding: 'utf-8'}));
const resolvers = require('./resolvers');
const LocationsAPI = require('./datasources/LocationsAPI');

const server = new ApolloServer({
  schema: buildSubgraphSchema({typeDefs, resolvers}),
  dataSources: () => {
    return {
      locationsAPI: new LocationsAPI()
    };
  }
});

const port = 4001;
const subgraphName = 'locations';

server
  .listen({port})
  .then(({url}) => {
    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  })
  .catch(err => {
    console.error(err);
  });
