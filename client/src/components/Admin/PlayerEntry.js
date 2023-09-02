import { useState } from "react";
import { Link } from "react-router-dom";
import PlayerModal from "./PlayerModal";

function PlayerEntry({ player, getPlayersData }) {
  const [showPlayerModal, setShowPlayerModal] = useState(false);

  return (
    <>
      {!showPlayerModal && (
        <div key={player.player_id} className="individual-entry">
          <p className="bold">
            <Link
              to={player.player_id.toString()}
              aria-label={`Go to ${player.player_firstname} ${player.player_lastname}'s player page`}
            >
              {player.player_firstname} {player.player_lastname}
            </Link>
          </p>
          <p>{player.player_phonenumber}</p>
          <p>{player.player_email}</p>

          <button
            onClick={() => setShowPlayerModal(true)}
            className="blue"
            aria-label={`Edit ${player.player_firstname} ${player.player_lastname}'s details`}
          >
            Edit player
          </button>
        </div>
      )}

      <div className="individual-entry-modal">
        {showPlayerModal && (
          <PlayerModal
            player={player}
            mode="edit"
            getPlayersData={getPlayersData}
            setShowPlayerModal={setShowPlayerModal}
          />
        )}
      </div>
    </>
  );
}

export default PlayerEntry;
