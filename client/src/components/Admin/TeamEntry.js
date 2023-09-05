import React, { useState } from "react";
import TeamModal from "./TeamModal";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function TeamEntry({ team, getTeamsData }) {
  const [showTeamsModal, setShowTeamsModal] = useState(false);

  //console.log(team);

  return (
    <>
      <div
        key={team.team_id}
        className={`individual-entry ${showTeamsModal ? "edit" : ""}`}
      >
        <p className="bold">
          <Link
            to={team.player1_id.toString()}
            aria-label={`Go to ${team.player1_firstname} and ${team.player2_firstname}'s team page`}
          >
            {team.player1_firstname} {team.player1_lastname}
          </Link>{" "}
          &{" "}
          <Link
            to={team.player1_id.toString()}
            aria-label={`Go to ${team.player1_firstname} and ${team.player2_firstname}'s team page`}
          >
            {team.player2_firstname} {team.player2_lastname}
          </Link>
        </p>
        {!showTeamsModal && (
          <>
            <p>Contact</p>
            <p>
              <Link
                to={team.team_id.toString()}
                aria-label={`Go to ${team.player1_firstname} and ${team.player2_firstname}'s team page`}
              >
                Team Page
              </Link>
            </p>

            <button
              onClick={() => setShowTeamsModal(true)}
              className="blue"
              aria-label={`Edit ${team.player1_firstname} and ${team.player2_firstname}'s team`}
            >
              <span>Edit team</span>
            </button>
          </>
        )}

        {showTeamsModal && (
          <TeamModal
            team={team}
            mode={"edit"}
            getTeamsData={getTeamsData}
            setShowTeamsModal={setShowTeamsModal}
          />
        )}
      </div>
    </>
  );
}

export default TeamEntry;
