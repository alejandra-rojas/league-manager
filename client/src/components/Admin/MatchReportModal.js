import React, { useState } from "react";

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
    <section className="h-auto bg-white px-10 py-10 rounded-xl shadow-xl ring-1 ring-gray-900/5">
      <header className="flex justify-between pb-3">
        <div>
          <h2>Match report</h2>
          <h2>
            Player 1: {match.team1_player1_firstname}{" "}
            {match.team1_player1_lastname} & {match.team1_player2_firstname}{" "}
            {match.team1_player2_lastname}
          </h2>
          <h2>
            Player 2: {match.team2_player1_firstname}{" "}
            {match.team2_player1_lastname} & {match.team2_player2_firstname}{" "}
            {match.team2_player2_lastname}
          </h2>
        </div>
        <button
          onClick={() => {
            setShowMatchReportModal(false);
          }}
        >
          Close
        </button>
      </header>

      <form className="flex-col">
        <label htmlFor="matchDate">Date of the match:</label>
        <input
          id="matchDate"
          required
          type="date"
          name="match_date"
          value={data.match_date === null ? "" : data.match_date}
          onChange={handleChange}
          className="my-3 mx-0 py-3 px-4 rounded-xl border border-gray-200"
        />
        <br />
        <label htmlFor="isFinished">Has the match been completed:</label>
        <input
          id="isFinished"
          type="checkbox"
          name="isfinished"
          checked={data.isfinished}
          onChange={handleChange}
        />
        <br />

        {data.isfinished && (
          <>
            <label htmlFor="winner">Who won:</label>
            <select
              id="winner"
              name="winner_id"
              value={data.winner_id !== null ? data.winner_id : ""}
              onChange={handleChange}
              className="my-3 mx-0 py-2 px-3 rounded-xl border border-gray-200"
            >
              <option value="">Select a winner</option>
              <option value={match.team1_id}>
                {match.team1_player1_firstname} {match.team1_player1_lastname} &{" "}
                {match.team1_player2_firstname} {match.team1_player2_lastname}
              </option>
              <option value={match.team2_id}>
                {match.team2_player1_firstname} {match.team2_player1_lastname} &{" "}
                {match.team2_player2_firstname} {match.team2_player2_lastname}
              </option>
            </select>
          </>
        )}
        <br />
        <label htmlFor="t1sets">Sets won by team 1:</label>
        <input
          id="t1sets"
          maxLength={1}
          placeholder="ex: 0"
          name="team1_sets"
          value={data.team1_sets}
          onChange={handleChange}
          className="my-3 mx-0 py-3 px-4 rounded-xl border border-gray-200"
        />
        <br />
        <label htmlFor="t2sets">Sets won by team 2:</label>
        <input
          id="t2sets"
          maxLength={1}
          placeholder="ex: 2"
          name="team2_sets"
          value={data.team2_sets}
          onChange={handleChange}
          className="my-3 mx-0 py-3 px-4 rounded-xl border border-gray-200"
        />
        <br />
        <label htmlFor="finalscore">Winner Score</label>
        <input
          id="finalscore"
          maxLength={15}
          placeholder="ex: '7/5 2/6 6/1"
          name="winner_score"
          value={data.winner_score === 0 ? "missing" : data.winner_score}
          onChange={handleChange}
          className="my-3 mx-0 py-3 px-4 rounded-xl border border-gray-200"
        />
        <br />
        <button
          className={
            "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
          }
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
