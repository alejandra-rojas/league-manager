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
    <ul className="filtered-participants">
      {resultArray.length === 0 ? (
        <li className="error">No match for that name!</li>
      ) : (
        <>
          {resultArray.slice(0, maxSuggestions).map((player, index) => (
            <li
              key={player.player_id}
              className={`${index % 2 === 0 ? "even-row" : "odd-row"}`}
            >
              <PlayerEntry
                player={player}
                getPlayersData={getPlayersData}
                setShowPlayerModal={setShowPlayerModal}
              />
            </li>
          ))}
        </>
      )}
    </ul>
  );
}

export default PlayerSearchBar;
