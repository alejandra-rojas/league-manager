import React, { useEffect, useState } from "react";
import EventModal from "./EventModal";

function EventEntry({ gevent, getEventsData }) {
  const [showEventModal, setShowEventModal] = useState(false);
  const [showTeams, setShowTeams] = useState(false);
  const [name, setName] = useState("");
  const [searchString, setSearchString] = useState("");
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);

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

  const onSubmitTeamsForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/teams/?name=${searchString}`
      );

      const parseResponse = await response.json();

      console.log(parseResponse);
      setTeams(parseResponse);
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
            <h3>Expanded event details</h3>
            <h3>TEAM - RANKINGS</h3>

            <div className="bg-gray-200 my-5">
              <button className="my-3">Add player/team to event</button>
              <div>
                <h1>Search for players</h1>
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
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((player) => (
                      <tr key={player.player_id}>
                        <td>{player.player_firstname}</td>
                        <td>{player.player_lastname}</td>
                        <td>Add player to event</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {players.length === 0 && <p>No players found</p>}
              </div>
            </div>

            <div className="bg-gray-200 my-5">
              <button className="my-3">Add team to event</button>
              <div>
                <h1>Search for teams</h1>
                <form onSubmit={onSubmitTeamsForm}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter players name"
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                  ></input>
                  <button>Submit</button>
                </form>
                <table>
                  <thead>
                    <tr>
                      <th>Team ID</th>
                      <th>Players 1 Name</th>
                      <th>Players 2 Name</th>
                      <th>action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.map((team) => (
                      <tr key={team.team_id}>
                        <td>{team.team_id}</td>
                        <td>
                          {team.player1_firstname} {team.player1_lastname}
                        </td>
                        <td>
                          {team.player2_firstname} {team.player2_lastname}
                        </td>
                        <td>Add team to event</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {teams.length === 0 && <p>No teams found</p>}
              </div>
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
