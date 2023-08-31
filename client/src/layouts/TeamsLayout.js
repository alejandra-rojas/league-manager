import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useTitle } from "../App";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import TeamModal from "../components/Admin/TeamModal";

function TeamsLayout() {
  useTitle("Teams Admin");
  const [teams, setTeams] = useState(null);
  const [showTeamsModal, setShowTeamsModal] = useState(false);

  //Getting teams data
  const getTeamsData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/teams`);
      const json = await response.json();
      setTeams(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => getTeamsData, []);

  return (
    <>
      <section id="teams-page">
        <header>
          <div>
            <h2>Teams Page</h2>
            <p>Manage your teams and access individual team pages</p>
          </div>
          <button
            onClick={() => setShowTeamsModal(true)}
            aria-label="Create a team"
            className="create-participant"
          >
            <UserPlusIcon width={25} />
            Create Team
          </button>
        </header>
        {showTeamsModal && (
          <TeamModal
            mode="create"
            getTeamsData={getTeamsData}
            setShowTeamsModal={setShowTeamsModal}
          />
        )}
        <Outlet />
      </section>
    </>
  );
}

export default TeamsLayout;
