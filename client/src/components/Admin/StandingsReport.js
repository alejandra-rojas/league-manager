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
    <div className="mt-5">
      <div className="grid grid-cols-6">
        <div>Player 1</div>
        <div>Player 2</div>
        <div>Match Date</div>
        <div>Finished</div>

        {/*         <div>P1 sets</div>
        <div>P2 sets</div> */}
        <div>Winner Score</div>
        <div className="hidden">Action</div>
      </div>

      {eventMatchesData?.map((match) => (
        <MatchReportEntry
          key={match.match_id}
          match={match}
          setShowMatchReportModal={setShowMatchReportModal}
          getEventMatchesData={getEventMatchesData}
          getEventTeamsData={getEventTeamsData}
        />
      ))}
    </div>
  );
}

export default StandingsReport;
