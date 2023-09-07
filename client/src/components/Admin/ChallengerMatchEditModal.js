import "../../styles/Admin/ChallengerMatch.scss";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";

function ChallengerMatchEditModal({
  mode,
  match,
  getChallengersData,
  setShowMatchReportModal,
}) {
  const [error, setError] = useState(null);

  const [data, setData] = useState({
    team1_id: match.team1_id,
    team2_id: match.team1_id,
    isfinished: match.isfinished,
    match_date: match.match_date,
    winner_id: match.winner_id,
    winner_score: match.winner_score,
    team1_bonus: match.team1_bonus,
    team2_bonus: match.team2_bonus,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  console.log(data);

  const editChallengerData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/challengers/${match.match_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        console.log("Event was edited!");
        setShowMatchReportModal(false);
        getChallengersData();
        toast.success(`Challenger match has been edited`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section id="edit-challenger-modal">
      <div className="new-challenge">
        <div className="header">
          <h4>Edit challenger match</h4>
          <button
            onClick={() => setShowMatchReportModal(false)}
            aria-label="Close the edit challenger modal"
          >
            <XMarkIcon width={25} />
            <span>close</span>
          </button>
        </div>

        <div className="match-report">
          <form>
            <div className="all-inputs">
              <div className="grouped-inputs">
                <div className="players">
                  <h6>
                    P1: {match.player1_firstname_1} &{" "}
                    {match.player2_firstname_1}
                  </h6>
                  <h6>
                    P2: {match.player1_firstname_2} &{" "}
                    {match.player2_firstname_2}
                  </h6>
                </div>
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
                        <option value={match.team1_id}>
                          {match.player1_firstname_1} {match.player1_lastname_1}{" "}
                          & {match.player1_firstname_2}{" "}
                          {match.player1_lastname_2}
                        </option>
                        <option value={match.team2_id}>
                          {match.player2_firstname_1} {match.player2_lastname_1}{" "}
                          & {match.player2_firstname_2}{" "}
                          {match.player2_lastname_2}
                        </option>
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
              onClick={editChallengerData}
              aria-label="Update Match data"
            >
              Edit challenger match
            </button>
          </form>
        </div>
      </div>

      {/* <div className="container">
        <div className="control">
          <h3>{mode} challenger match</h3>
          <button
            aria-label="Close new or edit challenger modal"
            onClick={() => {
              setShowChallengerModal(false);
            }}
          >
            <XMarkIcon width={25} />
            <span>close</span>
          </button>
        </div>
        <div className="players">
          <h6>
            T1: {match.team1_player1_firstname} {match.team1_player1_lastname} &{" "}
            {match.team1_player2_firstname} {match.team1_player2_lastname}
          </h6>
          <h6>
            T2: {match.team2_player1_firstname} {match.team2_player1_lastname} &{" "}
            {match.team2_player2_firstname} {match.team2_player2_lastname}
          </h6>
        </div>

        
      </div> */}
    </section>
  );
}

export default ChallengerMatchEditModal;
