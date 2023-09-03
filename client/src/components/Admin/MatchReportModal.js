import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

function MatchReportModal({
  match,
  setShowMatchReportModal,
  getEventMatchesData,
  getEventTeamsData,
}) {
  console.log(match);

  const [data, setData] = useState({
    match_date: match.match_date,
    isfinished: match.isfinished,
    winner_id: match.winner_id,
    team1_sets: match.team1_sets,
    team2_sets: match.team2_sets,
    winner_score: match.winner_score,
  });

  const updateMatchData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/matches/${match.match_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        console.log("Event was edited!");
        setShowMatchReportModal(false);
        getEventMatchesData();
        getEventTeamsData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    console.log("changing", e);
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <section id="report-modal">
      <header className="control">
        <h5>Match report</h5>

        <button
          onClick={() => {
            setShowMatchReportModal(false);
          }}
        >
          <XMarkIcon width={25} />
          <span>close</span>
        </button>
      </header>

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

      <form>
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
                    {match.team1_player1_firstname}{" "}
                    {match.team1_player1_lastname} &{" "}
                    {match.team1_player2_firstname}{" "}
                    {match.team1_player2_lastname}
                  </option>
                  <option value={match.team2_id}>
                    {match.team2_player1_firstname}{" "}
                    {match.team2_player1_lastname} &{" "}
                    {match.team2_player2_firstname}{" "}
                    {match.team2_player2_lastname}
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
              value={data.winner_score === 0 ? "missing" : data.winner_score}
              onChange={handleChange}
            />
          </div>

          <div className="input">
            <label htmlFor="t1sets">Sets won by T1:</label>
            <input
              id="t1sets"
              maxLength={1}
              placeholder="ex: 0"
              name="team1_sets"
              value={data.team1_sets}
              onChange={handleChange}
            />
          </div>

          <div className="input">
            <label htmlFor="t2sets">Sets won by T2:</label>
            <input
              id="t2sets"
              maxLength={1}
              placeholder="ex: 2"
              name="team2_sets"
              value={data.team2_sets}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          onClick={updateMatchData}
          aria-label="Update Match data"
        >
          Update match data
        </button>
      </form>
    </section>
  );
}

export default MatchReportModal;
