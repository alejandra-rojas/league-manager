import React, { useEffect, useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
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
      <button
        onClick={() => setShowTeamsModal(true)}
        className="flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        aria-label="Create a new team"
      >
        <UserPlusIcon width={20} />
        Create Team
      </button>

      {showTeamsModal && (
        <TeamModal
          mode="create"
          getTeamsData={getTeamsData}
          setShowTeamsModal={setShowTeamsModal}
        />
      )}

      <div id="Teams-Filter-Form">
        <label htmlFor="searchInput">Filter teams by player name</label>
        <input
          id="searchInput"
          onChange={(e) => setSearchState(e.target.value)}
          className="input-text"
          type="text"
          name="player"
          value={searchState}
          placeholder="Enter player name"
          aria-label="Filter teams by player name"
        />
      </div>

      {!searchState ? (
        <div id="All-Teams">
          {teams?.map((team) => (
            <TeamEntry
              key={team.team_id}
              team={team}
              getTeamsData={getTeamsData}
              setShowTeamsModal={setShowTeamsModal}
            />
          ))}
        </div>
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
    </>
  );
}

export default Teams;
