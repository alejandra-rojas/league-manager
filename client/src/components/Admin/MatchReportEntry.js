import React, { useState } from "react";
import MatchReportModal from "./MatchReportModal";
import { CheckIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";

function MatchReportEntry({
  index,
  match,
  getEventMatchesData,
  getEventTeamsData,
}) {
  const [showMatchReportModal, setShowMatchReportModal] = useState(false);

  return (
    <>
      <li
        className={`${match.withdrawal ? "withdrawn" : ""} ${
          !match.withdrawal ? (index % 2 === 0 ? "even-row" : "odd-row") : ""
        }`}
      >
        <div className={match.winner_id === match.team1_id ? "font-bold" : ""}>
          {match.team1_player1_firstname} & {match.team1_player2_firstname}
        </div>
        <div className={match.winner_id === match.team2_id ? "font-bold" : ""}>
          {match.team2_player1_firstname} & {match.team2_player2_firstname}
        </div>

        <div>{match.match_date === null ? "" : match.match_date}</div>
        <div>
          {match.isfinished ? <CheckIcon width={20} /> : ""}
          {!match.isfinished && match.match_date && <XMarkIcon width={20} />}
        </div>

        {/* <div>{match.team1_sets === 0 ? "-" : match.team1_sets}</div>
        <div>{match.team2_sets === 0 ? "-" : match.team2_sets}</div> */}
        <div>{match.winner_score.trim() === "1" ? "" : match.winner_score}</div>
        <button
          onClick={() => setShowMatchReportModal(true)}
          aria-label="Edit Match Details"
          disabled={match.withdrawal}
        >
          Edit
        </button>
      </li>

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
