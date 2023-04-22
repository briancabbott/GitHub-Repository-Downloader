import React from "react";
import { gql, useQuery } from "@apollo/client";

export const GET_PASSENGERS = gql`
  query GetPassengers {
    characters {
      results {
        id
        image
        isSpaceshipPassenger @client
      }
    }
  }
`;

export default function SpaceshipPassengers() {
  const { data, loading, error } = useQuery(GET_PASSENGERS);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const {
    characters: { results },
  } = data;

  const passengers = results.filter(
    (character) => character.isSpaceshipPassenger
  );

  if (!passengers.length) {
    return <p>No passengers. Add someone to your spaceship.</p>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, 100px)",
        gap: 20,
      }}
    >
      {passengers.map((passenger) => (
        <img
          key={passenger.id}
          src={passenger.image}
          alt={passenger.name}
          style={{
            width: "100%",
            borderRadius: "50%",
            border: "5px solid #318bbe",
          }}
        />
      ))}
    </div>
  );
}
