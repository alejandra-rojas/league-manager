import React, { useState } from "react";
import { toast } from "react-toastify";
import { TrashIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";

function PlayerModal({ player, mode, getPlayersData, setShowPlayerModal }) {
  //console.log(player);
  const editMode = mode === "edit" ? true : false;
  const [data, setData] = useState({
    player_firstname: editMode ? player.player_firstname : "",
    player_lastname: editMode ? player.player_lastname : "",
    player_phonenumber: editMode ? player.player_phonenumber : "",
    player_email: editMode ? player.player_email : "",
  });

  const handleChange = (e) => {
    //console.log("changing", e);
    const { name, value } = e.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));

    //console.log(data);
  };

  //Create new player
  const postPlayer = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/players`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (response.status === 200) {
        console.log("Registered new player succesfully!");
        getPlayersData();
        setShowPlayerModal(false);
        toast.success(
          `${data.player_firstname} ${data.player_lastname} has been succesfully registered`
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Edit player
  const editPlayer = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/players/${player.player_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (response.status === 200) {
        console.log("edited");
        getPlayersData();
        setShowPlayerModal(false);
        toast.success(`Player has been modified succesfully`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Delete Player
  const deletePlayer = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/players/${player.player_id}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 200) {
        console.log("deleted");
        toast.success(`Player has been deleted`);
        setShowPlayerModal(false);
        getPlayersData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="players-modal">
      <div className="control">
        <h3>{editMode ? "Edit player" : "Register new player"}</h3>
        <button
          aria-label={`Close ${editMode ? "edit player" : "new player"} modal`}
          onClick={() => {
            setShowPlayerModal(false);
          }}
        >
          <XMarkIcon width={25} />
          <span>close</span>
        </button>
      </div>

      <form>
        <div className="input">
          {!editMode && <label htmlFor="firstName">First name</label>}
          <input
            id="firstName"
            required
            maxLength={30}
            placeholder="John"
            name="player_firstname"
            aria-labelledby="modalTitle"
            value={data.player_firstname}
            onChange={handleChange}
          />
        </div>

        <div className="input">
          {!editMode && <label htmlFor="lastName">Last name</label>}
          <input
            id="lastName"
            required
            maxLength={30}
            placeholder="Doe"
            name="player_lastname"
            value={data.player_lastname}
            onChange={handleChange}
          />
        </div>

        <div className="input">
          {!editMode && <label htmlFor="phone">Contact number</label>}
          <input
            id="phone"
            required
            maxLength={30}
            placeholder="07869609041"
            name="player_phonenumber"
            value={data.player_phonenumber}
            onChange={handleChange}
          />
        </div>

        <div className="input">
          {!editMode && <label htmlFor="email">Email address</label>}
          <input
            id="email"
            required
            maxLength={30}
            placeholder="john@doe.com"
            name="player_email"
            value={data.player_email}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          onClick={editMode ? editPlayer : postPlayer}
          aria-label={editMode ? "Edit Player" : "Create Player"}
        >
          {editMode ? "update" : "Register player"}
        </button>
      </form>

      {editMode && (
        <div>
          <button
            onClick={deletePlayer}
            aria-label="Delete player"
            className="delete"
          >
            <TrashIcon width={20} />
            <span>Delete player</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default PlayerModal;
