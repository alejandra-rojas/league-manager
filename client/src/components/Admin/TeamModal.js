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
    setSearchPerformed(false);
    setTeams([]);
    setSearchString("");
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
      }, 9000); // 5 seconds timeout
      console.log("You can't add more than two players.");
    } else if (playerExists) {
      setError("This player is already selected");
      setTimeout(() => {
        setError("");
      }, 9000); // 5 seconds timeout
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
            <div className="flex">
              <button className="my-3">Add team to event</button>
              <button
                className="border"
                onClick={() => {
                  setShowTeamsModal(false);
                }}
              >
                X
              </button>
            </div>

            <div>
              <h1>Search for existing players</h1>
              <form onSubmit={onSubmitForm}>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter players name"
                  value={searchString}
                  onChange={(e) => setSearchString(e.target.value)}
                ></input>
                {searchPerformed && players.length >= 1 && (
                  <button onClick={clearSearchResults}>Clear search</button>
                )}
                <button>Submit</button>
              </form>
              {searchPerformed && players.length === 0 && (
                <p>No player found</p>
              )}

              <table>
                <thead className="hidden">
                  <tr>
                    <th>Team ID</th>
                    <th>Players name</th>
                    <th>action</th>
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
                        <button onClick={() => addPlayer(player)}>
                          Add player to team
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                    <button onClick={() => removePlayer(player)}>
                      Remove player
                    </button>
                  </li>
                ))}
              </ul>
              {error && <p>{error}</p>}
              {selectedPlayers.length === 2 && (
                <button onClick={createTeam}>Create team</button>
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
          >
            X
          </button>
          <button onClick={deleteTeam}>
            <TrashIcon width={20} />
            <span>delete team</span>
          </button>
        </div>
      )}
    </>
  );
}

export default TeamModal;
