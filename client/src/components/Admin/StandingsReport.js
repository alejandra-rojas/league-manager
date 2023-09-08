import React, { useState } from "react";
import MatchReportEntry from "./MatchReportEntry";
import MatchReportModal from "./MatchReportModal";

function StandingsReport({
  eventMatchesData,
  getEventMatchesData,
  getEventTeamsData,
}) {
  const [showMatchReportModal, setShowMatchReportModal] = useState(false);

  //Sorting matches by match data and isFinished condition
  const sortedEventMatchesData = eventMatchesData.slice().sort((a, b) => {
    const conditionA = a.isfinished ? 0 : a.withdrawal ? 2 : 1;
    const conditionB = b.isfinished ? 0 : b.withdrawal ? 2 : 1;

    if (conditionA !== conditionB) {
      return conditionA - conditionB;
    }

    return new Date(a.match_date) - new Date(b.match_date);
  });

  return (
    <section id="match-reports-table">
      <ul>
        <li className="md-header">
          <span>Player 1</span>
          <span>Player 2</span>
          <p>Match Date</p>
          <span>Finished</span>
          {/*<div>P1 sets</div>
        <div>P2 sets</div> */}
          <span>Winner Score</span>
          <span>Action</span>
        </li>
        {sortedEventMatchesData?.map((match, index) => (
          <MatchReportEntry
            index={index}
            key={match.match_id}
            match={match}
            setShowMatchReportModal={setShowMatchReportModal}
            getEventMatchesData={getEventMatchesData}
            getEventTeamsData={getEventTeamsData}
          />
        ))}
      </ul>
    </section>
  );
}

export default StandingsReport;
