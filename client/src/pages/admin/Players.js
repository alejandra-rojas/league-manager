import React, { useState } from "react";
import {
  useLoaderData,
  Link,
  Form,
  useActionData,
  redirect,
} from "react-router-dom";

function Players() {
  const players = useLoaderData();
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const data = useActionData();

  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={() => setShowAddPlayer(true)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Add Player
        </button>
      </div>

      {showAddPlayer && (
        <div>
          <div className="h-auto bg-white px-10 py-10 rounded-xl shadow-xl ring-1 ring-gray-900/5">
            <div className="flex justify-between pb-3">
              <h3 className="text-xl font-bold">
                Add a new player to the database
              </h3>
              <button
                className="border"
                onClick={() => {
                  setShowAddPlayer(false);
                }}
              >
                X
              </button>
            </div>
            <Form className="flex-col" method="post" action="/players">
              <label htmlFor="firstName">First name:</label>
              <input
                id="firstName"
                required
                maxLength={30}
                placeholder="John"
                name="player_firstname"
                className="my-3 mx-0 py-3 px-4 rounded-xl border border-gray-200"
              />
              <br />
              <label htmlFor="lastName">Last name:</label>
              <input
                id="lastName"
                required
                maxLength={30}
                placeholder="Doe"
                name="player_lastname"
                className="my-3 mx-0 py-3 px-4 rounded-xl border border-gray-200"
              />
              <br />
              <label htmlFor="phone">Contact number:</label>
              <input
                id="phone"
                required
                maxLength={30}
                placeholder="07869609041"
                name="player_phonenumber"
                className="my-3 mx-0 py-3 px-4 rounded-xl border border-gray-200"
              />
              <br />
              <label htmlFor="email">Email address:</label>
              <input
                id="email"
                required
                maxLength={30}
                placeholder="john@doe.com"
                name="player_email"
                className="my-3 mx-0 py-3 px-4 rounded-xl border border-gray-200"
              />

              <input
                className={
                  "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
                }
                type="submit"
              />

              {data && data.error && <p>{data.error}</p>}
            </Form>
          </div>
        </div>
      )}

      <div className="">
        {players.map((player) => (
          <Link
            to={player.player_id.toString()}
            key={player.player_id}
            className="flex gap-9"
          >
            {player.player_firstname} {player.player_lastname}
            <p>{player.player_phonenumber}</p>
            <p>{player.player_email}</p>
          </Link>
        ))}
      </div>
    </>
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

// action function
