import React, { useEffect, useState } from "react";
import EventModal from "./EventModal";
import StandingsReport from "./StandingsReport";

function EventEntry({ gevent, getEventsData }) {
  const [eventTeams, setEventTeams] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showTeams, setShowTeams] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false); // New state

  // const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [eventMatchesData, setEventMatchesData] = useState(null);
  const [selectedTeamWId, setSelectedTeamWId] = useState("");

  //console.log(gevent);

  function calculateCombinations(n) {
    return n - 1;
  }

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

  /*   const onSubmitForm = async (e) => {
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
  }; */

  const onSubmitTeamsForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/teams/?name=${searchString}`
      );

      const parseResponse = await response.json();

      console.log(parseResponse);
      setTeams(parseResponse);
      setSearchPerformed(true);
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
        // provide feedback to the user
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
  console.log(eventMatchesData);

  const withdrawTeam = async (e, team_id) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/events/${gevent.event_id}/teams/${team_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ team_id }),
        }
      );

      if (response.status === 200) {
        console.log("Team added to event!");
        getEventTeamsData();
        getEventMatchesData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="bg-gray-300 p-3 mb-2 border rounded-md">
        <div className="flex justify-between">
          <div className="flex gap-7 items-center">
            <h3>{gevent.event_name}</h3>
            <h2>
              Complete matches {gevent.midway_matches} before the midpoint to
              get 2 bonus points.{" "}
            </h2>
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
                    {searchPerformed && teams.length === 0 && (
                      <p>No teams found</p>
                    )}
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
                  <table className="table-auto border-collapse border">
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
                          SetsWon
                        </th>
                        <th className="border-b border-solid  border-slate-600">
                          MidBon
                        </th>
                        <th className="border-b border-solid  border-slate-600">
                          AllBon
                        </th>
                        <th className="border-b border-solid  border-slate-600">
                          ChallBon
                        </th>
                        <th className="border-b border-solid  border-slate-600">
                          Total points
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {eventTeams
                        .sort((a, b) => b.total_points - a.total_points)
                        .map((team) => {
                          const activeTeamsCount = eventTeams.filter(
                            (t) => !t.team_withdrawn
                          ).length;
                          console.log(activeTeamsCount);
                          const totalMatches =
                            calculateCombinations(activeTeamsCount);

                          return (
                            <tr
                              key={team.team_id}
                              className={
                                team.team_withdrawn ? "bg-slate-600" : ""
                              }
                            >
                              <td>
                                {team.player1_firstname} {team.player1_lastname}{" "}
                                & {team.player2_firstname}{" "}
                                {team.player2_lastname}
                              </td>
                              <td>
                                {team.played_matches}/{totalMatches}
                              </td>
                              <td>{team.team_wins}</td>
                              <td>{team.played_matches - team.team_wins}</td>
                              <td>{team.team_sets_won}</td>
                              <td>{team.mid_bonus}</td>
                              <td>{team.all_bonus}</td>
                              <td>{team.challenger_bonus}</td>
                              <td>{team.total_points}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                <p>
                  The standings table for this event has been published and the
                  participating teams cannot be altered anymore. If a team has
                  withdrawn update every match accordingly.
                </p>
                {/* {console.log(eventMatchesData)} */}

                <StandingsReport
                  eventMatchesData={eventMatchesData}
                  getEventMatchesData={getEventMatchesData}
                  getEventTeamsData={getEventTeamsData}
                />

                <div className="mt-5">
                  If a player has withdrawn from this event report it here.
                </div>

                <form>
                  <label htmlFor="withdrawal">Which player withdrawn:</label>
                  <select
                    id="withdrawal"
                    name="winner_id"
                    value={selectedTeamWId}
                    onChange={(e) => setSelectedTeamWId(e.target.value)}
                    className="my-3 mx-0 py-2 px-3 rounded-xl border border-gray-200"
                  >
                    <option value="">select</option>
                    {eventTeams
                      .filter((team) => !team.team_withdrawn) // Filter out teams with team_withdrawal true
                      .map((team) => (
                        <option
                          key={team.team_id}
                          value={team.team_id}
                          className="flex gap-10 py-1"
                        >
                          {team.player1_firstname} {team.player1_lastname} &{" "}
                          {team.player2_firstname} {team.player2_lastname}
                        </option>
                      ))}
                  </select>
                  <input
                    className={
                      "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
                    }
                    type="submit"
                    onClick={(e) => withdrawTeam(e, selectedTeamWId)}
                  />
                </form>

                <div className="mt-5">Add a challenger match</div>
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
          getEventTeamsData={getEventTeamsData}
          gevent={gevent}
        />
      )}
    </>
  );
}

export default EventEntry;
