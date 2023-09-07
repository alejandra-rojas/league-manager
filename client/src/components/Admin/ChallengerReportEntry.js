import "../../styles/Admin/EventEntry.scss";
import React, { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ChallengerMatchEditModal from "./ChallengerMatchEditModal";

function ChallengerReportEntry({
  index,
  match,
  filteredChallengerMatches,
  getChallengersData,
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
          {match.player1_firstname_1} & {match.player2_firstname_1}
        </div>
        <div className={match.winner_id === match.team2_id ? "font-bold" : ""}>
          {match.player1_firstname_2} & {match.player2_firstname_2}
        </div>

        <div>{match.match_date === null ? "" : match.match_date}</div>
        <div>
          {match.isfinished ? <CheckIcon width={20} /> : ""}
          {!match.isfinished && match.match_date && <XMarkIcon width={20} />}
        </div>

        <div>{match.winner_score.trim() === "1" ? "" : match.winner_score}</div>

        <div>{match.team1_bonus}</div>
        <div>{match.team2_bonus}</div>
        <button
          onClick={() => setShowMatchReportModal(true)}
          aria-label="Edit Match Details"
          disabled={match.withdrawal}
        >
          edit match
        </button>
      </li>

      {showMatchReportModal && (
        <ChallengerMatchEditModal
          mode={"edit"}
          match={match}
          setShowMatchReportModal={setShowMatchReportModal}
          getChallengersData={getChallengersData}
        />
      )}
    </>
  );
}

export default ChallengerReportEntry;
