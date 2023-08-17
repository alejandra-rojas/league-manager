import React from "react";
import { Link } from "react-router-dom";

function PlayerSearchBar({
  searchState,
  setSearchState,
  players,
  maxSuggestions = 10,
}) {
  const regex = new RegExp(searchState, "i");

  const resultArray = players.filter((player) => {
    return (
      player.player_firstname.match(regex) ||
      player.player_lastname.match(regex)
    );
  });

  return (
    <div className="suggestion-wrapper">
      {resultArray.length === 0 ? (
        <div className="suggestion no-match">
          <span className="suggestion-text">
            No match for that players name
          </span>
        </div>
      ) : (
        <>
          {resultArray.slice(0, maxSuggestions).map((value) => (
            <Link key={value.player_id} className="link" to={value.path}>
              <div
                className="suggestion"
                onClick={() => setSearchState(value.name)}
              >
                <span className="suggestion-text">
                  {value.player_firstname} {value.player_lastname}
                </span>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
}

export default PlayerSearchBar;
