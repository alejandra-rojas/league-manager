import { useEffect, useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import PlayerModal from "../../components/Admin/PlayerModal";
import PlayerEntry from "../../components/Admin/PlayerEntry";

function Players() {
  const [players, setPlayers] = useState(null);
  const [showPlayerModal, setShowPlayerModal] = useState(false);

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
      <div className="flex justify-end">
        <button
          onClick={() => setShowPlayerModal(true)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Add Player
        </button>
      </div>
      <div className="">
        {players?.map((player) => (
          <PlayerEntry
            key={player.player_id}
            player={player}
            getPlayersData={getPlayersData}
            setShowPlayerModal={setShowPlayerModal}
          />
        ))}
      </div>

      {showPlayerModal && (
        <PlayerModal
          mode={"create"}
          getPlayersData={getPlayersData}
          setShowPlayerModal={setShowPlayerModal}
        />
      )}
    </>
  );
}

export default Players;
