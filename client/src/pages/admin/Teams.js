import React, { useEffect, useState } from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { UserGroupIcon } from "@heroicons/react/24/outline";

import TeamModal from "../../components/Admin/TeamModal";
import TeamEntry from "../../components/Admin/TeamEntry";
import TeamSearchBar from "../../components/Admin/TeamSearchBar";
import { useTitle } from "../../App";

function Teams() {
  useTitle("Teams Admin");
  const [teams, setTeams] = useState(null);
  const [showTeamsModal, setShowTeamsModal] = useState(false);
  const [searchState, setSearchState] = useState("");

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
  console.log(teams);

  return (
    <>
      <header>
        <div>
          <h2>Teams Database</h2>
          <p>Manage your teams and access individual team pages</p>
        </div>
        {!showTeamsModal && (
          <button
            onClick={() => setShowTeamsModal(true)}
            aria-label="Create a team"
            className="create-participant"
          >
            <UserGroupIcon width={30} />
            Create Team
          </button>
        )}
      </header>
      {showTeamsModal && (
        <TeamModal
          mode="create"
          getTeamsData={getTeamsData}
          setShowTeamsModal={setShowTeamsModal}
        />
      )}
      <div className="database-list">
        <div className="filter-bar">
          <label htmlFor="searchInput">
            {" "}
            <FunnelIcon width={35} />
            <span className="sr-only">Filter teams by players name</span>
          </label>
          <input
            id="searchInput"
            onChange={(e) => setSearchState(e.target.value)}
            className="input-text"
            type="text"
            name="player"
            value={searchState}
            placeholder="Filter list by participants name"
            aria-label="Filter list by participants name"
          />
        </div>

        <ul className="header">
          <li className="individual-entry">
            <p>Name</p>
            <p>Contact number</p>
            <p>Email address</p>
          </li>
        </ul>

        {!searchState ? (
          //List of all teams
          <ul className="all-participants">
            {teams?.map((team, index) => (
              <li
                key={team.team_id}
                className={`${index % 2 === 0 ? "even-row" : "odd-row"}`}
              >
                <TeamEntry
                  key={team.team_id}
                  team={team}
                  getTeamsData={getTeamsData}
                  setShowTeamsModal={setShowTeamsModal}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div id="Filtered-Teams">
            <TeamSearchBar
              teams={teams}
              searchState={searchState}
              setSearchState={setSearchState}
              getTeamsData={getTeamsData}
              showTeamsModal={showTeamsModal}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Teams;
