import "../styles/Admin/PlayersPage.scss";
import { UserPlusIcon } from "@heroicons/react/24/outline";

import { NavLink, Outlet } from "react-router-dom";
import { useTitle } from "../App";
import { useEffect, useState } from "react";
import PlayerModal from "../components/Admin/PlayerModal";

export default function PlayersLayout() {
  useTitle("Players Admin");
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
      <section id="players-page">
        <header>
          <div>
            <h2>Players Page</h2>
            <p>
              Manage your players database and access individual player pages
            </p>
          </div>
          <button
            onClick={() => setShowPlayerModal(true)}
            aria-label="Add Player"
            className="create-participant"
          >
            <UserPlusIcon width={25} />
            Create Player
          </button>
        </header>
        {showPlayerModal && (
          <PlayerModal
            mode="create"
            getPlayersData={getPlayersData}
            setShowPlayerModal={setShowPlayerModal}
          />
        )}
        <Outlet />
      </section>
    </>
  );
}
