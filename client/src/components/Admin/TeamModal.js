import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TrashIcon } from "@heroicons/react/24/solid";

function TeamModal({ team, mode, getTeamsData, setShowTeamsModal }) {
  const editMode = mode === "edit" ? true : false;
  const [players, setPlayers] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [teams, setTeams] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [error, setError] = useState(null);

  //Getting players data
  const getPlayersData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/players`
      );
      const json = await response.json();
      setPlayers(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => getPlayersData, []);
  console.log(players);

  // Search for players form
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/searchplayers/?name=${searchString}`
      );

      const parseResponse = await response.json();
      console.log(parseResponse);
      setPlayers(parseResponse);
      setSearchPerformed(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  const clearSearchResults = () => {
    setTeams([]);
    setSearchString("");
    setSearchPerformed(false);
  };

  // Add player to team
  const addPlayer = (player) => {
    setError("");
    const playerExists = selectedPlayers.some(
      (selectedPlayer) => selectedPlayer.player_id === player.player_id
    );

    if (!playerExists && selectedPlayers.length < 2) {
      setSelectedPlayers([...selectedPlayers, player]);
    } else if (selectedPlayers.length === 2) {
      setError("A team can only have two players");
      setTimeout(() => {
        setError("");
      }, 9000);
      console.log("You can't add more than two players.");
    } else if (playerExists) {
      setError("This player is already selected");
      setTimeout(() => {
        setError("");
      }, 9000);
      console.log("This player is already selected.");
    }
  };
  console.log(selectedPlayers);

  const removePlayer = (playerToRemove) => {
    const updatedPlayers = selectedPlayers.filter(
      (player) => player !== playerToRemove
    );
    setSelectedPlayers(updatedPlayers);
    setError("");
  };

  // CREATE TEAM FETCH REQUEST
  const createTeam = async (player1_id, player2_id) => {
    try {
      if (selectedPlayers.length !== 2) {
        console.log("You need to select exactly two players.");
        return;
      }
      const player1_id = selectedPlayers[0].player_id;
      const player2_id = selectedPlayers[1].player_id;

      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/teams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          player1_id,
          player2_id,
        }),
      });

      const data = await response.json();

      if (data.detail) {
        setError(data.detail);
      }
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  //DELETE TEAM
  const deleteTeam = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/teams/${team.team_id}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 200) {
        console.log("Team deleted");
        toast.success(`Team has been deleted`);
        setShowTeamsModal(false);
        getTeamsData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!editMode && (
        <div>
          <div className="bg-gray-200 p-3 my-3 border rounded-md">
            <div className="flex justify-between items-center mb-3">
              <button
                className="border bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={() => setShowTeamsModal(false)}
                aria-label="Close the create team modal"
              >
                Close
              </button>
            </div>

            <div>
              <h1>Search for an existing players</h1>
              <form onSubmit={onSubmitForm} className="flex">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter players name"
                  value={searchString}
                  onChange={(e) => setSearchString(e.target.value)}
                  className="my-3 mr-2 px-3 py-2 rounded-md border border-gray-300"
                  aria-label="Search for players by name"
                />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                  aria-label="Submit the player search"
                >
                  Submit
                </button>
                {searchPerformed && players.length >= 1 && (
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2"
                    onClick={clearSearchResults}
                    aria-label="Clear the player search results"
                  >
                    Clear search
                  </button>
                )}
              </form>
              {searchPerformed && players.length === 0 && (
                <p>No player found</p>
              )}

              {searchPerformed && players.length > 0 && (
                <table className="w-full">
                  <thead className="hidden">
                    <tr>
                      <th>Team ID</th>
                      <th>Players name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((player) => (
                      <tr key={player.player_id} className="flex g-5">
                        <td>{player.player_id}</td>
                        <td>
                          {player.player_firstname} {player.player_lastname}
                        </td>
                        <td>
                          <button
                            onClick={() => addPlayer(player)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                            aria-label={`Add ${player.player_firstname} ${player.player_lastname} to team`}
                          >
                            Add player to team
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {selectedPlayers.length !== 0 && (
            <>
              <div>You are creating a team with players:</div>
              <ul>
                {selectedPlayers.map((player) => (
                  <li key={player.player_id} className="flex gap-10 py-1">
                    <p>
                      {player.player_firstname} {player.player_lastname}
                    </p>
                    <button
                      onClick={() => removePlayer(player)}
                      aria-label={`Remove ${player.player_firstname} ${player.player_lastname} from team`}
                    >
                      Remove player
                    </button>
                  </li>
                ))}
              </ul>
              {error && (
                <p className="text-red-500" aria-live="assertive">
                  {error}
                </p>
              )}
              {selectedPlayers.length === 2 && (
                <button
                  onClick={createTeam}
                  aria-label="Create team"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded-full"
                >
                  Create team
                </button>
              )}
            </>
          )}
        </div>
      )}

      {editMode && (
        <div className="h-auto bg-white px-10 py-10 rounded-xl shadow-xl ring-1 ring-gray-900/5">
          <button
            className="border"
            onClick={() => {
              setShowTeamsModal(false);
            }}
            aria-label="Close team modal"
          >
            Close
          </button>
          <button
            onClick={deleteTeam}
            className="flex"
            aria-label={`Delete ${team.player1_firstname} and ${team.player2_firstname}'s team`}
          >
            <TrashIcon width={20} />
            <span>Delete team</span>
          </button>
        </div>
      )}
    </>
  );
}

export default TeamModal;
