import React, { useEffect, useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import TeamModal from "../../components/Admin/TeamModal";
import TeamEntry from "../../components/Admin/TeamEntry";
import TeamSearchBar from "../../components/Admin/TeamSearchBar";

function Teams() {
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
      <div className="flex justify-end">
        <button
          onClick={() => setShowTeamsModal(true)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          <UserPlusIcon width={20} />
          Create team
        </button>
      </div>

      {showTeamsModal && (
        <TeamModal
          mode={"create"}
          getTeamsData={getTeamsData}
          setShowTeamsModal={setShowTeamsModal}
        />
      )}

      <div className="my-5">
        <label htmlFor="location">Search for a team</label>
        <input
          onChange={(e) => setSearchState(e.target.value)}
          className="input-text"
          type="text"
          name="player"
          value={searchState}
          placeholder="search by player name"
        />
      </div>

      {!searchState && (
        <div>
          {teams?.map((team) => (
            <TeamEntry
              key={team.team_id}
              team={team}
              getTeamsData={getTeamsData}
              setShowTeamsModal={setShowTeamsModal}
            />
          ))}
        </div>
      )}

      {searchState.length > 0 && (
        <TeamSearchBar
          teams={teams}
          searchState={searchState}
          setSearchState={setSearchState}
          getTeamsData={getTeamsData}
          showTeamsModal={showTeamsModal}
        />
      )}
    </>
  );
}

export default Teams;
