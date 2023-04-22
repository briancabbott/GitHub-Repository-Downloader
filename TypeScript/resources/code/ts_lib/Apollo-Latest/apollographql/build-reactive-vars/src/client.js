import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const spaceshipPassengersVar = makeVar([]);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        spaceshipPassengers: {
          read() {
            return spaceshipPassengersVar();
          },
        },
      },
    },
    Character: {
      fields: {
        isSpaceshipPassenger: {
          read(_, { readField }) {
            const characterId = readField("id");
            const spaceshipPassengers = spaceshipPassengersVar();
            return spaceshipPassengers.includes(characterId);
          },
        },
      },
    },
  },
});

export const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache,
});
