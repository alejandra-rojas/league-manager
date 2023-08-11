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

      {/*       <ul className="my-5">
        <table>
          <thead>
            <tr>
              <th className="border-b border-solid  border-slate-600">
                Player
              </th>
              <th className="border-b border-solid  border-slate-600">
                Match Date
              </th>
              <th className="border-b border-solid  border-slate-600">
                Completed?
              </th>
              <th className="border-b border-solid  border-slate-600">
                Who won?
              </th>
              <th className="border-b border-solid  border-slate-600">
                Team1 sets
              </th>
              <th className="border-b border-solid  border-slate-600">
                Team2 sets
              </th>
              <th className="border-b border-solid  border-slate-600">
                Winner Score
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {eventMatchesData?.map((match) => (
              <MatchReportEntry
                key={match.match_id}
                match={match}
                setShowMatchReportModal={setShowMatchReportModal}
                // getEventsData={getEventsData}
              />
            ))}
          </tbody>
        </table>
      </ul>
 */}
    </div>
  );
}

export default StandingsReport;
