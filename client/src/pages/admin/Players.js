import React from "react";
import { useLoaderData, Link } from "react-router-dom";

function Players() {
  const players = useLoaderData();

  return (
    <div className="">
      {players.map((player) => (
        <Link to={"/"} key={player.player_id} className="flex gap-9">
          {player.player_firstname} {player.player_lastname}
          <p>{player.player_phonenumber}</p>
          <p>{player.player_email}</p>
        </Link>
      ))}
    </div>
  );
}

export default Players;

// loader function
export const playersData = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/players`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
};
