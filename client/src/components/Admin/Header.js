import React, { useState } from "react";
import LeagueModal from "./LeagueModal";
import { useCookies } from "react-cookie";
import PlayerTeamModal from "./PlayerTeamModal";

export default function Header({ getData }) {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const adminEmail = cookies.Email;
  const [showModal, setShowModal] = useState(false);

  const signOut = () => {
    console.log("loged out");
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  };

  return (
    <div>
      <div className="flex justify-between">
        <p>Welcome back {adminEmail}</p>
        <div className="inline-flex">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            onClick={() => setShowModal(true)}
          >
            Create League
          </button>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ">
            Add Player/Team
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      </div>
      {showModal && (
        <LeagueModal
          mode={"create"}
          setShowModal={setShowModal}
          getData={getData}
        />
      )}
      <PlayerTeamModal />
    </div>
  );
}
