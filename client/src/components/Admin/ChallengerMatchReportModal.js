import "../../styles/Admin/ChallengerMatch.scss";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";

function ChallengerMatchModal({
  setShowChallengerModal,
  league,
  getChallengersData,
}) {
  const [newSelectionModal, setNewSelectionModal] = useState(true);
  const [newMatchModal, setNewMatchModal] = useState(false);
  const [players, setPlayers] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [teams, setTeams] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [error, setError] = useState(null);

  // Search for players form
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/searchteams/?name=${searchString}`
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

  // Add player to challenger match
  const addPlayer = (player) => {
    setError("");
    const playerExists = selectedPlayers.some(
      (selectedPlayer) => selectedPlayer.team_id === player.team_id
    );

    if (!playerExists && selectedPlayers.length < 2) {
      setSelectedPlayers([...selectedPlayers, player]);
    } else if (selectedPlayers.length === 2) {
      setError("A match can only have two participants");
      setTimeout(() => {
        setError("");
      }, 9000);
      console.log("You can't add more than two players.");
    } else if (playerExists) {
      setError("This participant is already selected");
      setTimeout(() => {
        setError("");
      }, 9000);
      console.log("This participant is already selected.");
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

  const createChallengerMatch = () => {
    setNewMatchModal(true);
    setNewSelectionModal(false);
  };

  const [data, setData] = useState({
    team1_id: "",
    team2_id: "",
    isfinished: "",
    match_date: "",
    winner_id: "",
    winner_score: "",
    team1_bonus: "",
    team2_bonus: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  console.log(data);

  const postChallengerData = async (e) => {
    e.preventDefault();

    const team1_id = selectedPlayers[0].team_id;
    const team2_id = selectedPlayers[1].team_id;

    // Log the values before making the request
    console.log("team1_id:", team1_id);
    console.log("team2_id:", team2_id);

    const requestData = {
      ...data,
      team1_id,
      team2_id,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/leagues/${league.id}/challengers`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        }
      );
      if (response.status === 200) {
        console.log("Created new challenger match succesfully!");
        setShowChallengerModal(false);
        getChallengersData();
        toast.success(`Challenger Match created `);
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(players);

  return (
    <section id="challenger-modal" className="new">
      <div className="new-challenge">
        <div className="header">
          <h4>Create a challenger match</h4>
          <button
            onClick={() => setShowChallengerModal(false)}
            aria-label="Close the create team modal"
          >
            <XMarkIcon width={25} />
            <span>close</span>
          </button>
        </div>

        {newSelectionModal && (
          <div className="participants-selection">
            {selectedPlayers.length !== 0 && (
              <div className="match-selection">
                <h5>You are creating a challenger match with participants:</h5>
                <ul>
                  {selectedPlayers.map((player) => (
                    <li key={player.team_id}>
                      <p>
                        <span>
                          {player.player1_firstname} {player.player1_lastname}
                        </span>
                        <span> & </span>
                        <span>
                          {player.player2_firstname} {player.player2_lastname}
                        </span>
                      </p>
                      <div
                        onClick={() => removePlayer(player)}
                        className="remove"
                        aria-label={`Remove ${player.player1_firstname} ${player.player2_firstname} from team`}
                      >
                        Remove participant
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
                  <button
                    onClick={createChallengerMatch}
                    aria-label="Create challenger match"
                  >
                    Create challenger match
                  </button>
                )}
              </div>
            )}

            <div className="participant-search">
              <form onSubmit={onSubmitForm}>
                <input
                  type="text"
                  name="name"
                  placeholder="Search by participants name"
                  value={searchString}
                  onChange={(e) => setSearchString(e.target.value)}
                  aria-label="Search for participants by name"
                />
                <button
                  type="submit"
                  aria-label="Submit participant search"
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
                {searchPerformed && players.length === 0 && (
                  <p>No player found</p>
                )}

                {searchPerformed && players.length > 0 && (
                  <ul>
                    {players.map((player, index) => (
                      <li
                        key={player.team_id}
                        className={index % 2 === 0 ? "even-row" : "odd-row"}
                      >
                        <span>
                          {player.player1_firstname} {player.player1_lastname}
                        </span>
                        <span>&</span>
                        <span>
                          {player.player2_firstname} {player.player2_lastname}
                        </span>
                        <span>
                          <button
                            onClick={() => addPlayer(player)}
                            aria-label={`Add ${player.player1_firstname} ${player.player2_firstname} to team`}
                          >
                            Add participant to challenger
                          </button>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}

        {newMatchModal && (
          <div className="match-report">
            <form>
              <div className="all-inputs">
                <div className="grouped-inputs participants">
                  {selectedPlayers.map((player, index) => (
                    <h6 className="input" key={index}>
                      P{index + 1}: {player[`player1_firstname`]} &{" "}
                      {player[`player2_firstname`]}
                    </h6>
                  ))}
                </div>

                <div className="grouped-inputs">
                  <div className="input">
                    <label htmlFor="matchDate">Date of the match:</label>
                    <input
                      id="matchDate"
                      required
                      type="date"
                      name="match_date"
                      value={data.match_date === null ? "" : data.match_date}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input checkbox">
                    <label htmlFor="isFinished">Match completed?</label>
                    <input
                      id="isFinished"
                      type="checkbox"
                      name="isfinished"
                      checked={data.isfinished}
                      onChange={handleChange}
                    />
                  </div>

                  {data.isfinished && (
                    <>
                      <div className="input">
                        <label htmlFor="winner">Who won:</label>
                        <select
                          id="winner"
                          name="winner_id"
                          value={data.winner_id !== null ? data.winner_id : ""}
                          onChange={handleChange}
                        >
                          <option value="">Select a winner</option>
                          {selectedPlayers.map((player, index) => (
                            <option key={index} value={player.team_id}>
                              {player.player1_firstname}{" "}
                              {player.player1_lastname} &amp;{" "}
                              {player.player2_firstname}{" "}
                              {player.player2_lastname}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}
                </div>
                <div className="grouped-inputs">
                  <div className="input">
                    <label htmlFor="finalscore">Winner score:</label>
                    <input
                      id="finalscore"
                      maxLength={15}
                      placeholder="ex: '7/5 2/6 6/1"
                      name="winner_score"
                      value={
                        data.winner_score === 0 ? "missing" : data.winner_score
                      }
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input">
                    <label htmlFor="t1bonus">P1 bonus points:</label>
                    <input
                      id="t1bonus"
                      maxLength={1}
                      placeholder="ex: 0"
                      name="team1_bonus"
                      value={data.team1_bonus}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input">
                    <label htmlFor="t2sets">P2 bonus points:</label>
                    <input
                      id="t2sets"
                      maxLength={1}
                      placeholder="ex: 2"
                      name="team2_bonus"
                      value={data.team2_bonus}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                onClick={postChallengerData}
                aria-label="Update Match data"
              >
                Submit challenger match
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

export default ChallengerMatchModal;
