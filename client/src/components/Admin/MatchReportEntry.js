import React, { useState } from "react";
import MatchReportModal from "./MatchReportModal";

function MatchReportEntry({ match, getEventMatchesData, getEventTeamsData }) {
  const [showMatchReportModal, setShowMatchReportModal] = useState(false);

  return (
    <>
      <div
        className={`grid grid-cols-6 ${match.withdrawal ? "bg-slate-600" : ""}`}
      >
        <div className={match.winner_id === match.team1_id ? "font-bold" : ""}>
          {match.team1_player1_firstname} & {match.team1_player2_firstname}
        </div>
        <div className={match.winner_id === match.team2_id ? "font-bold" : ""}>
          {match.team2_player1_firstname} & {match.team2_player2_firstname}
        </div>

        <div>{match.match_date.trim() === "0" ? "-" : match.match_date}</div>
        <div>{match.isfinished ? "☑️" : "-"}</div>

        {/* <div>{match.team1_sets === 0 ? "-" : match.team1_sets}</div>
        <div>{match.team2_sets === 0 ? "-" : match.team2_sets}</div> */}
        <div>
          {match.winner_score.trim() === "0" ? "-" : match.winner_score}
        </div>
        <button
          onClick={() => setShowMatchReportModal(true)}
          className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-1 px-3 border border-gray-500 hover:border-transparent rounded"
        >
          Edit
        </button>
      </div>

      {/* <tr key={match.match_id} className=" border-b-orange-500 border-solid">
        <td>
          {match.team1_player1_firstname} {match.team1_player2_firstname} VS{" "}
          {match.team2_player1_firstname} {match.team2_player2_firstname}
        </td>
        <td>{match.match_date}</td>
        <td>{match.isfinished ? "☑️" : ""}</td>
        <td>{match.winner_id}</td>
        <td>{match.team1_sets}</td>
        <td>{match.team2_sets}</td>
        <td>{match.winner_score}</td>
        <td
          onClick={() => setShowMatchReportModal(true)}
          className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-1 px-3 border border-gray-500 hover:border-transparent rounded"
        >
          Edit
        </td>
      </tr> */}

      {showMatchReportModal && (
        <MatchReportModal
          match={match}
          setShowMatchReportModal={setShowMatchReportModal}
          getEventMatchesData={getEventMatchesData}
          getEventTeamsData={getEventTeamsData}
        />
      )}
    </>
  );
}

export default MatchReportEntry;
