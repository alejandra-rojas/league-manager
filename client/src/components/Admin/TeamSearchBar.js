import React from "react";
import TeamEntry from "./TeamEntry";

function TeamSearchBar({
  teams,
  searchState,
  setSearchState,
  showTeamsModal,
  getTeamsData,
  maxSuggestions = 20,
}) {
  const regex = new RegExp(searchState, "i");

  const resultArray = teams.filter((team) => {
    return (
      team.player1_firstname.match(regex) ||
      team.player1_lastname.match(regex) ||
      team.player2_firstname.match(regex) ||
      team.player2_lastname.match(regex)
    );
  });

  return (
    <div className="searchresults-wrapper">
      {resultArray.length === 0 ? (
        <div className="searchresults no-match">
          <span className="searchresults-text">No match for that name</span>
        </div>
      ) : (
        <>
          {resultArray.slice(0, maxSuggestions).map((team) => (
            <TeamEntry
              key={team.team_id}
              team={team}
              getTeamsData={getTeamsData}
              showTeamsModal={showTeamsModal}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default TeamSearchBar;
