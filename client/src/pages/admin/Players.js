import { useEffect, useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import PlayerModal from "../../components/Admin/PlayerModal";
import PlayerEntry from "../../components/Admin/PlayerEntry";
import PlayerSearchBar from "../../components/Admin/PlayerSearchBar";
import { useTitle } from "../../App";

function Players() {
  useTitle("Players Admin");
  const [players, setPlayers] = useState(null);
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [searchState, setSearchState] = useState("");

  //Getting players data
  const getPlayersData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/players`
      );
      const json = await response.json();
      setPlayers(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => getPlayersData, []);
  console.log(players);

  return (
    <>
      <div className="my-5">
        <label htmlFor="searchPlayer">Filter players by name</label>
        <input
          id="searchPlayer"
          onChange={(e) => setSearchState(e.target.value)}
          className="input-text"
          type="text"
          name="player"
          value={searchState}
          placeholder="Enter player's name"
          aria-label="Filter players by name"
        />
      </div>

      {!searchState && (
        <div>
          {players?.map((player) => (
            <PlayerEntry
              key={player.player_id}
              player={player}
              getPlayersData={getPlayersData}
              setShowPlayerModal={setShowPlayerModal}
            />
          ))}
        </div>
      )}

      {searchState.length > 0 && (
        <PlayerSearchBar
          players={players}
          searchState={searchState}
          setSearchState={setSearchState}
          getPlayersData={getPlayersData}
          setShowPlayerModal={setShowPlayerModal}
        />
      )}
    </>
  );
}

export default Players;
