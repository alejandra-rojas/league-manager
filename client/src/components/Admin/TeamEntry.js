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
          aria-label={`Go to ${team.player1_firstname} and ${team.player2_firstname}'s team page`}
        >
          <p>{team.team_id}</p>
          <p>
            {team.player1_firstname} {team.player1_lastname} &{" "}
            {team.player2_firstname} {team.player2_lastname}
          </p>
        </Link>
        <button
          onClick={() => setShowTeamsModal(true)}
          aria-label={`Edit ${team.player1_firstname} and ${team.player2_firstname}'s team`}
        >
          <span>Edit team</span>
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
