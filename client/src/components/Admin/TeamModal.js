import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TrashIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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
    <div id="teams-modal">
      {!editMode && (
        <div className="new-team">
          <div className="header">
            <h4>Create a team from existing players</h4>
            <button
              onClick={() => setShowTeamsModal(false)}
              aria-label="Close the create team modal"
            >
              <XMarkIcon width={25} />
              <span>close</span>
            </button>
          </div>

          {selectedPlayers.length !== 0 && (
            <div className="team-creation">
              <h5>You are creating a team with players:</h5>
              <ul>
                {selectedPlayers.map((player) => (
                  <li key={player.player_id}>
                    <p>
                      {player.player_firstname} {player.player_lastname}
                    </p>
                    <div
                      onClick={() => removePlayer(player)}
                      className="remove"
                      aria-label={`Remove ${player.player_firstname} ${player.player_lastname} from team`}
                    >
                      Remove player
                    </div>
                  </li>
                ))}
              </ul>
              {error && (
                <p className="error" aria-live="assertive">
                  {error}
                </p>
              )}
              {selectedPlayers.length === 2 && (
                <button onClick={createTeam} aria-label="Create team">
                  Create team
                </button>
              )}
            </div>
          )}

          <form onSubmit={onSubmitForm}>
            <input
              type="text"
              name="name"
              placeholder="Search by players name"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              aria-label="Search for players by name"
            />
            <button
              type="submit"
              aria-label="Submit player search"
              disabled={!searchString}
            >
              <MagnifyingGlassIcon width={25} />
              <span>search</span>
            </button>
            <div className="clear-search">
              {searchPerformed && players.length >= 1 && (
                <button
                  onClick={clearSearchResults}
                  aria-label="Clear search results"
                >
                  <XMarkIcon width={20} />
                </button>
              )}
            </div>
          </form>

          <div className="search-results">
            {searchPerformed && players.length === 0 && <p>No player found</p>}

            {searchPerformed && players.length > 0 && (
              <ul>
                {players.map((player, index) => (
                  <li
                    key={player.player_id}
                    className={index % 2 === 0 ? "even-row" : "odd-row"}
                  >
                    <span>
                      {player.player_firstname} {player.player_lastname}
                    </span>
                    <span>
                      <button
                        onClick={() => addPlayer(player)}
                        aria-label={`Add ${player.player_firstname} ${player.player_lastname} to team`}
                      >
                        Add player to team
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {editMode && (
        <div className="delete-team">
          <button
            onClick={deleteTeam}
            className="delete"
            aria-label={`Delete ${team.player1_firstname} and ${team.player2_firstname}'s team`}
          >
            <TrashIcon width={20} />
            <span>Delete</span>
          </button>
          <button
            className="exit"
            onClick={() => {
              setShowTeamsModal(false);
            }}
            aria-label="Close team modal"
          >
            <XMarkIcon width={25} />
            <span>exit </span>
          </button>
        </div>
      )}
    </div>
  );
}

export default TeamModal;
