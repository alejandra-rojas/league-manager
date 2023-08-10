import React, { useEffect, useState } from "react";
import EventModal from "./EventModal";
import { Link } from "react-router-dom";

function EventEntry({ gevent, getEventsData }) {
  const [eventTeams, setEventTeams] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showTeams, setShowTeams] = useState(false);
  const [name, setName] = useState("");
  const [searchString, setSearchString] = useState("");
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [eventMatchesData, setEventMatchesData] = useState(null);

  console.log(eventMatchesData);

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
  //console.log(eventTeams);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/searchplayers/?name=${name}`
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

  const handleGenerateMatches = async () => {
    const matchCombinations = [];

    for (let i = 0; i < eventTeams.length; i++) {
      for (let j = i + 1; j < eventTeams.length; j++) {
        matchCombinations.push({
          event_id: eventTeams[i].event_id,
          team1_id: eventTeams[i].team_id,
          team2_id: eventTeams[j].team_id,
        });
      }
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/matches`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(matchCombinations),
        }
      );

      if (response.status === 201) {
        const newMatches = await response.json();
        console.log("New matches created:", newMatches);
        // You can update the UI or provide feedback to the user here
        getEventMatchesData();
      } else {
        console.log("Error generating matches:", response.statusText);
        // Handle the error and provide feedback to the user
      }
    } catch (error) {
      console.error("Error generating matches:", error);
      // Handle the error and provide feedback to the user
    }
  };

  const getEventMatchesData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/events/${gevent.event_id}/matches`
      );
      const json = await response.json();
      setEventMatchesData(json);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => getEventMatchesData, []);
  //console.log(gevent);

  return (
    <>
      <div className="bg-gray-300 p-3 mb-2 border rounded-md">
        <div className="flex justify-between">
          <div className="flex gap-7 items-center">
            <h3>{gevent.event_name}</h3>
            <button
              onClick={() => setShowEventModal(true)}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
            >
              Edit
            </button>
          </div>

          <button
            onClick={() => setShowTeams((prevState) => !prevState)}
            className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-1 px-3 border border-gray-500 hover:border-transparent rounded"
          >
            {showTeams ? "close event" : "expand event"}
          </button>
        </div>

        {showTeams && (
          <div className="eventteams">
            {eventMatchesData.length === 0 && (
              <>
                <div className="bg-gray-200 p-3 my-3 border rounded-md">
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
                      <thead className="hidden">
                        <tr>
                          <th>Team ID</th>
                          <th>Players 1 Name</th>
                          <th>Players 2 Name</th>
                          <th>action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teams.map((team) => (
                          <tr key={team.team_id} className="flex g-5">
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
                    {/* {teams.length === 0 && <p>No teams found</p>} */}
                  </div>
                </div>

                <h3>Participating teams</h3>
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

                <button
                  onClick={handleGenerateMatches}
                  className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded-full"
                >
                  Create division matches table
                </button>
              </>
            )}
            {eventMatchesData.length !== 0 && (
              <div>
                <div className="my-5">
                  <h3>Participating teams</h3>
                  <table class="table-auto border-collapse border">
                    <thead>
                      <tr>
                        <th className="border-b border-solid  border-slate-600">
                          Name
                        </th>
                        <th className="border-b border-solid  border-slate-600">
                          Played
                        </th>
                        <th className="border-b border-solid  border-slate-600">
                          Won
                        </th>
                        <th className="border-b border-solid  border-slate-600">
                          Lost
                        </th>
                        <th className="border-b border-solid  border-slate-600">
                          Bonus
                        </th>
                        <th className="border-b border-solid  border-slate-600">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {eventTeams.map((team) => (
                        <tr
                          key={team.team_id}
                          className=" border-b-orange-500 border-solid"
                        >
                          <td>
                            {team.player1_firstname} {team.player1_lastname} &{" "}
                            {team.player2_firstname} {team.player2_lastname}
                          </td>
                          <td>2/5</td>
                          <td>1</td>
                          <td>1</td>
                          <td>0</td>
                          <td>2</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p>
                  The standings table for this event has been published and the
                  participating teams cannot be altered anymore. If a team has
                  withdrawn update every match accordingly.
                </p>
                {/* {console.log(eventMatchesData)} */}

                <ul className="my-5">
                  <h1>{gevent.event_name} matches</h1>
                  {eventMatchesData.map((match) => (
                    <li
                      className="flex gap-10 py-1 border"
                      key={match.match_id}
                    >
                      <div>
                        <p>
                          {match.team1_player1_firstname} &{" "}
                          {match.team1_player2_firstname} VS{" "}
                          {match.team2_player1_firstname} &{" "}
                          {match.team2_player2_firstname}
                        </p>
                      </div>
                      <div>Match Date {match.match_date}</div>
                      <div>Is match finished {match.isFinished}</div>
                      <div>Who won {match.winner_id}</div>
                      <div>Number of sets team 1 won {match.team1_sets}</div>
                      <div>Number of sets team 2 won {match.team2_sets}</div>
                      <div>Winner Score {match.winner_score}</div>
                      <div>Team withdrawal {match.withdrawal}</div>
                      <button>Edit results</button>
                    </li>
                  ))}
                </ul>

                <p>If a team has withdrawn from this table.</p>
              </div>
            )}
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
