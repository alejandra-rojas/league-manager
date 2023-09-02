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
    <ul className="filtered-participants">
      {resultArray.length === 0 ? (
        <li className="error">No match for that name</li>
      ) : (
        <>
          {resultArray.slice(0, maxSuggestions).map((team, index) => (
            <li
              key={team.team_id}
              className={`${index % 2 === 0 ? "even-row" : "odd-row"}`}
            >
              <TeamEntry
                team={team}
                getTeamsData={getTeamsData}
                showTeamsModal={showTeamsModal}
              />
            </li>
          ))}
        </>
      )}
    </ul>
  );
}

export default TeamSearchBar;
