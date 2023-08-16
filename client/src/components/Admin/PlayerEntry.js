import { useState } from "react";
import { Link } from "react-router-dom";
import PlayerModal from "./PlayerModal";

function PlayerEntry({ player, getPlayersData }) {
  const [showPlayerModal, setShowPlayerModal] = useState(false);

  return (
    <div>
      <div key={player.player_id} className="flex justify-between">
        <Link
          to={player.player_id.toString()}
          className="flex gap-9"
          aria-label={`Go to  ${player.player_firstname} ${player.player_lastname} players page`}
        >
          {player.player_firstname} {player.player_lastname}
          <p>{player.player_phonenumber}</p>
          <p>{player.player_email}</p>
        </Link>
        <button onClick={() => setShowPlayerModal(true)}>edit</button>
      </div>

      {showPlayerModal && (
        <PlayerModal
          player={player}
          mode={"edit"}
          getPlayersData={getPlayersData}
          setShowPlayerModal={setShowPlayerModal}
        />
      )}
    </div>
  );
}

export default PlayerEntry;
