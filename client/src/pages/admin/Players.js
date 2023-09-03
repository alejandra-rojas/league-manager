import { useEffect, useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { FunnelIcon } from "@heroicons/react/24/outline";
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
      <header>
        <div>
          <h2>Players Database</h2>
          <p>Manage your players database and access individual player pages</p>
        </div>
        {!showPlayerModal && (
          <button
            onClick={() => setShowPlayerModal(true)}
            aria-label="Add Player"
            className="create-participant"
          >
            <UserPlusIcon width={30} />
            Add Player
          </button>
        )}
      </header>
      {showPlayerModal && (
        <PlayerModal
          mode="create"
          getPlayersData={getPlayersData}
          setShowPlayerModal={setShowPlayerModal}
        />
      )}
      <div className="database-list">
        <div className="filter-bar">
          <label htmlFor="searchPlayer">
            <FunnelIcon width={35} />
            <span className="sr-only">Filter players by name</span>
          </label>
          <input
            id="searchPlayer"
            onChange={(e) => setSearchState(e.target.value)}
            className="input-text"
            type="text"
            name="player"
            value={searchState}
            placeholder="Filter list by player's name"
            aria-label="Filter players by name"
          />
        </div>

        <ul className="header">
          <li className="individual-entry">
            <p>Name</p>
            <p>Contact number</p>
            <p>Email address</p>
          </li>
        </ul>

        {!searchState && (
          //List of all players
          <ul className="all-participants">
            {players?.map((player, index) => (
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
          </ul>
        )}

        {searchState.length > 0 && (
          //Results from the search
          <PlayerSearchBar
            players={players}
            searchState={searchState}
            setSearchState={setSearchState}
            getPlayersData={getPlayersData}
            setShowPlayerModal={setShowPlayerModal}
          />
        )}
      </div>
    </>
  );
}

export default Players;
