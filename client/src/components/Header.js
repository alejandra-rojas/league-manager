import React, { useState } from "react";
import Modal from "./Modal";
import { useCookies } from "react-cookie";

export default function Header({ getData }) {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const adminEmail = cookies.AdminEmail;
  const [showModal, setShowModal] = useState(false);

  const signOut = () => {
    console.log("loged out");
    removeCookie("AdminEmail");
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
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      </div>
      {showModal && (
        <Modal mode={"create"} setShowModal={setShowModal} getData={getData} />
      )}
    </div>
  );
}
