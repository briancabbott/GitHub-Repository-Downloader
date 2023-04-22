import CharacterGrid from "./components/CharacterGrid";
import React from "react";
import SpaceshipPassengers from "./components/SpaceshipPassengers";

export default function App() {
  return (
    <>
      <div
        style={{
          padding: "24px 16px",
          border: "10px solid #92c5dd",
          borderRadius: "16px",
          marginBottom: "16px",
        }}
      >
        <h2 style={{ fontFamily: "Helvetica" }}>Spaceship passengers</h2>
        <SpaceshipPassengers />
      </div>
      <CharacterGrid />
    </>
  );
}
