import PlayerEntry from "./PlayerEntry";

function PlayerSearchBar({
  searchState,
  players,
  getPlayersData,
  setShowPlayerModal,

  maxSuggestions = 20,
}) {
  const regex = new RegExp(searchState, "i");

  const resultArray = players.filter((player) => {
    return (
      player.player_firstname.match(regex) ||
      player.player_lastname.match(regex)
    );
  });

  return (
    <div id="search-results-player">
      {resultArray.length === 0 ? (
        <span className="searchresults-text">No match for that name</span>
      ) : (
        <>
          {resultArray.slice(0, maxSuggestions).map((player) => (
            <PlayerEntry
              key={player.player_id}
              player={player}
              getPlayersData={getPlayersData}
              setShowPlayerModal={setShowPlayerModal}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default PlayerSearchBar;
