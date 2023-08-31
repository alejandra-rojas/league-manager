import React, { useState } from "react";
import MatchReportEntry from "./MatchReportEntry";
import MatchReportModal from "./MatchReportModal";

function StandingsReport({
  eventMatchesData,
  getEventMatchesData,
  getEventTeamsData,
}) {
  const [showMatchReportModal, setShowMatchReportModal] = useState(false);

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
        {eventMatchesData?.map((match, index) => (
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
