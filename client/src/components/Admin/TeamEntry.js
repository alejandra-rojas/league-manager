import React, { useState } from "react";
import TeamModal from "./TeamModal";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

function TeamEntry({ team, getTeamsData }) {
  const [showTeamsModal, setShowTeamsModal] = useState(false);

  return (
    <div>
      <div key={team.team_id} className="flex justify-between">
        <Link
          to={team.team_id.toString()}
          className="flex gap-9"
          aria-label={`Go to  teams page`}
        >
          <p>{team.team_id}</p>
          {team.player1_firstname} {team.player1_lastname} &{" "}
          {team.player2_firstname} {team.player2_lastname}
        </Link>
        <button onClick={() => setShowTeamsModal(true)}>
          <span>edit team</span>
        </button>
      </div>

      {showTeamsModal && (
        <TeamModal
          team={team}
          mode={"edit"}
          getTeamsData={getTeamsData}
          setShowTeamsModal={setShowTeamsModal}
        />
      )}
    </div>
  );
}

export default TeamEntry;
