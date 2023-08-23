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
    <div id="Filtered-Teams-Results">
      {resultArray.length === 0 ? (
        <p role="alert">No match for that name</p>
      ) : (
        <ul>
          {resultArray.slice(0, maxSuggestions).map((team) => (
            <li key={team.team_id}>
              <TeamEntry
                team={team}
                getTeamsData={getTeamsData}
                showTeamsModal={showTeamsModal}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TeamSearchBar;
