import React, { useEffect, useState } from "react";
import EventModal from "./EventModal";

function EventEntry({ gevent, getEventsData }) {
  const [eventTeams, setEventTeams] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showTeams, setShowTeams] = useState(false);
  const [name, setName] = useState("");
  const [searchString, setSearchString] = useState("");
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);

  const getEventTeamsData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/events/${gevent.event_id}/teams`
      );
      const json = await response.json();
      setEventTeams(json);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => getEventTeamsData, []);
  console.log(eventTeams);

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

  const addTeam = async (team_id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/events/${gevent.event_id}/teams`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ team_id }),
        }
      );

      if (response.status === 200) {
        console.log("Team added to event!");
        getEventTeamsData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeTeam = async (team_id) => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVERURL}/events/${gevent.event_id}/teams/${team_id}`,
      {
        method: "DELETE",
      }
    );

    if (response.status === 200) {
      console.log("Team DELETED from event!");
      getEventTeamsData();
    }
    try {
    } catch (error) {
      console.error(error);
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
            <h3>Teams & event standings</h3>
            <ul>
              {eventTeams.map((team) => (
                <li key={team.team_id} className="flex gap-10 py-1">
                  <p>
                    {team.player1_firstname} {team.player1_lastname} &{" "}
                    {team.player2_firstname} {team.player2_lastname}
                  </p>
                  <button onClick={() => removeTeam(team.team_id)}>
                    Remove team from event
                  </button>
                </li>
              ))}
            </ul>
            <div className="bg-gray-200 my-5">
              <button className="my-3">Add player/team to event</button>
              <div>
                <h1>Search for existing players</h1>
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
                <h1>Search for existing teams</h1>
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
                        <td>
                          <button onClick={() => addTeam(team.team_id)}>
                            Add team to event
                          </button>
                        </td>
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
