import React, { useEffect, useState } from "react";
import EventModal from "./EventModal";

function EventEntry({ gevent, getEventsData }) {
  const [showEventModal, setShowEventModal] = useState(false);
  const [showTeams, setShowTeams] = useState(false);
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/players/?name=${name}`
      );

      const parseResponse = await response.json();
      setPlayers(parseResponse);
    } catch (err) {
      console.error(err.message);
    }
  };

  console.log(gevent);
  return (
    <>
      <div className="bg-gray-300 p-3 mb-2 ">
        <div className="flex justify-between items-center">
          <h3>{gevent.event_name}</h3>
          <div className="flex gap-3">
            <button onClick={() => setShowEventModal(true)}>Edit</button>
            <button
              onClick={() => setShowTeams((prevState) => !prevState)}
              className="p-1 border"
            >
              {showTeams ? "-" : "+"}
            </button>
          </div>
        </div>
        {showTeams && (
          <div className="eventteams">
            <h3>expanded event details</h3>
            <h3>TEAMS</h3>

            <button className="my-3">Search for player</button>
            <div>
              <h1>Players list</h1>
              <form onSubmit={onSubmitForm}>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter players name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
                <button>Submit</button>
              </form>
              <table>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player) => (
                    <tr key={player.player_id}>
                      <td>{player.player_firstname}</td>
                      <td>{player.player_lastname}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {players.length === 0 && <p>No results found</p>}
            </div>
          </div>
        )}
      </div>
      {showEventModal && (
        <EventModal
          mode={"edit"}
          setShowEventModal={setShowEventModal}
          getEventsData={getEventsData}
          gevent={gevent}
        />
      )}
    </>
  );
}

export default EventEntry;
