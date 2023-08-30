import "../../styles/Admin/EventEntry.scss";
import React, { useEffect, useState } from "react";
import EventModal from "./EventModal";
import StandingsReport from "./StandingsReport";
import { toast } from "react-toastify";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { SparklesIcon } from "@heroicons/react/24/solid";

function EventEntry({ gevent, getEventsData }) {
  const [eventTeams, setEventTeams] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showTeams, setShowTeams] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  // const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [eventMatchesData, setEventMatchesData] = useState(null);
  const [selectedTeamWId, setSelectedTeamWId] = useState("");
  const [error, setError] = useState(null);

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
  //console.log(eventTeams);

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
        `${process.env.REACT_APP_SERVERURL}/searchteams/?name=${searchString}`
      );
      const parseResponse = await response.json();

      console.log(parseResponse);
      setTeams(parseResponse);
      setSearchPerformed(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  const clearSearchResults = () => {
    setSearchPerformed(false);
    setTeams([]);
    setSearchString("");
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

      const data = await response.json();
      //console.log(data);
      if (response.status === 200) {
        console.log("Team added to event!");
        setError(null);
        getEventTeamsData();
      }
      if (data.message) {
        setError(data.message);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
      //console.log(error);
    } catch (error) {
      console.error(error);
      setError(error);
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
      //console.log("Team DELETED from event!");
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
        toast.success(
          `${gevent.event_name} standings table has been generated succesfully`
        );
        getEventMatchesData();
      } else {
        console.log("Error generating matches:", response.statusText);
      }
    } catch (error) {
      console.error("Error generating matches:", error);
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
  //console.log(eventMatchesData);

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
      <section id="event-entry">
        <header>
          <div className="event-details">
            <h4>{gevent.event_name}</h4>
            <button
              onClick={() => setShowEventModal(true)}
              aria-label="Opel modal to edit this event"
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
            >
              Edit event
            </button>
          </div>
          <button
            onClick={() => setShowTeams((prevState) => !prevState)}
            aria-expanded={showTeams}
            aria-controls="eventDetailsSection"
          >
            {showTeams ? "Close event details " : "Expand event details"}
          </button>
        </header>

        {showEventModal && (
          <EventModal
            mode={"edit"}
            setShowEventModal={setShowEventModal}
            getEventsData={getEventsData}
            getEventTeamsData={getEventTeamsData}
            gevent={gevent}
          />
        )}

        {showTeams && (
          <>
            <div className="mid-bonus-info">
              {eventMatchesData.length !== 0 && (
                <p>
                  Complete {gevent.midway_matches} matches before the midpoint
                  to get bonus points
                </p>
              )}
              <div className="line"></div>
            </div>

            <div id="event-details">
              {eventMatchesData.length === 0 && (
                <section id="create-event-table">
                  <div className="participants">
                    <h5>Participants</h5>
                    {eventTeams.length === 0 ? (
                      <p className="text-highlight">
                        There are no participants on this event yet. To add a
                        participant to an event, search for them using the
                        search field below.
                      </p>
                    ) : (
                      <div className="list">
                        <ul>
                          {eventTeams.map((team, index) => (
                            <li
                              key={team.team_id}
                              className={
                                index % 2 === 0 ? "even-row" : "odd-row"
                              }
                            >
                              <p>
                                <span>
                                  {team.player1_firstname}{" "}
                                  {team.player1_lastname}
                                </span>{" "}
                                <span>
                                  & {team.player2_firstname}{" "}
                                  {team.player2_lastname}
                                </span>
                              </p>
                              <button
                                aria-label={`Remove team ${team.player1_firstname} ${team.player1_lastname} & ${team.player2_firstname} ${team.player2_lastname} from event`}
                                onClick={() => removeTeam(team.team_id)}
                              >
                                <span>Remove</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {eventTeams.length >= 4 && (
                      <button
                        onClick={handleGenerateMatches}
                        aria-label={`Create matches table`}
                        className="create-table"
                      >
                        <SparklesIcon width={20} />
                        Create standings table
                      </button>
                    )}
                  </div>

                  <section id="player-search">
                    <div className="search-input">
                      {/* <h5>Search the database by participant's name</h5> */}

                      <form onSubmit={onSubmitTeamsForm}>
                        <input
                          type="text"
                          id="searchInput"
                          name="name"
                          placeholder="Search by participant's name:"
                          value={searchString}
                          onChange={(e) => setSearchString(e.target.value)}
                        ></input>
                        <div className="clear-search">
                          {searchPerformed && (
                            <button
                              onClick={clearSearchResults}
                              aria-label="Clear search results"
                            >
                              <XMarkIcon width={20} />
                            </button>
                          )}
                        </div>
                        <button
                          type="submit"
                          aria-label="Submit search"
                          disabled={!searchString}
                        >
                          <MagnifyingGlassIcon width={25} />
                          <span>search</span>
                        </button>
                      </form>
                      {error && <p className="text-red-600">{error}</p>}
                    </div>
                    {searchPerformed && teams.length >= 1 && (
                      <div className="search-results">
                        <h5>Search results:</h5>
                        <table>
                          <thead className="sr-only">
                            <tr>
                              <th scope="col">Team ID</th>
                              <th scope="col">Players 1 Name</th>
                              <th scope="col">&</th>
                              <th scope="col">Players 2 Name</th>
                              <th scope="col">action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {teams.map((team, index) => (
                              <tr
                                key={team.team_id}
                                className={
                                  index % 2 === 0 ? "even-row" : "odd-row"
                                }
                              >
                                <td>{team.team_id}</td>
                                <td>
                                  {team.player1_firstname}{" "}
                                  {team.player1_lastname}
                                </td>
                                <td>&</td>
                                <td>
                                  {team.player2_firstname}{" "}
                                  {team.player2_lastname}
                                </td>
                                <td>
                                  <button
                                    onClick={() => addTeam(team.team_id)}
                                    aria-label={`Add team ${team.player1_firstname} ${team.player1_lastname} & ${team.player2_firstname} ${team.player2_lastname} to event`}
                                  >
                                    Add team to event
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {searchPerformed && teams.length === 0 && (
                      <p className="error">
                        No results! You can add a new participant to the
                        database via the players page
                      </p>
                    )}
                  </section>
                </section>
              )}
              {eventMatchesData.length !== 0 && (
                <section id="event-standings">
                  <div className="my-5">
                    <table className="table-auto border-collapse border">
                      <h5 className="sr-only">Event Standings</h5>
                      <thead>
                        <tr>
                          <th className="border-b border-slate-600" scope="col">
                            Name
                          </th>
                          <th className="border-b border-slate-600" scope="col">
                            Played
                          </th>
                          <th className="border-b border-slate-600" scope="col">
                            Won
                          </th>
                          <th className="border-b border-slate-600" scope="col">
                            Lost
                          </th>
                          <th className="border-b border-slate-600" scope="col">
                            Sets Won
                          </th>
                          <th className="border-b border-slate-600" scope="col">
                            Midway Bonus
                          </th>
                          <th className="border-b border-slate-600" scope="col">
                            All Bonus
                          </th>
                          <th className="border-b border-slate-600" scope="col">
                            Challenger Bonus
                          </th>
                          <th className="border-b border-slate-600" scope="col">
                            Total Points
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
                            //console.log(activeTeamsCount);
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
                                  {`${team.player1_firstname} ${team.player1_lastname} & ${team.player2_firstname} ${team.player2_lastname}`}
                                </td>
                                <td>{`${team.played_matches}/${totalMatches}`}</td>
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

                    <p>
                      Note: Once the standings table for an event has been
                      published and the participating teams cannot be altered
                      anymore, unless the team is withdrawing from the event.
                    </p>
                  </div>

                  <StandingsReport
                    eventMatchesData={eventMatchesData}
                    getEventMatchesData={getEventMatchesData}
                    getEventTeamsData={getEventTeamsData}
                  />

                  <form id="team-withdrawal-form">
                    <div className="mt-5">
                      <h4>Report Player Withdrawal</h4>
                      <p>
                        If a player has withdrawn from this event, please report
                        it here.
                      </p>
                    </div>

                    <label htmlFor="withdrawal">
                      Which player has withdrawn:
                    </label>
                    <select
                      id="withdrawal"
                      name="winner_id"
                      value={selectedTeamWId}
                      onChange={(e) => setSelectedTeamWId(e.target.value)}
                      className="my-3 mx-0 py-2 px-3 rounded-xl border border-gray-200"
                      aria-label="Select the player who has withdrawn"
                    >
                      <option value="">Select</option>
                      {eventTeams
                        .filter((team) => !team.team_withdrawn) // Filter out teams with team_withdrawal true
                        .map((team) => (
                          <option key={team.team_id} value={team.team_id}>
                            {`${team.player1_firstname} ${team.player1_lastname} & ${team.player2_firstname} ${team.player2_lastname}`}
                          </option>
                        ))}
                    </select>
                    <button
                      className={
                        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 border border-blue-500 hover:border-transparent rounded"
                      }
                      type="submit"
                      onClick={(e) => withdrawTeam(e, selectedTeamWId)}
                      aria-label="Report Withdrawal"
                    >
                      Report Withdrawal
                    </button>
                  </form>

                  <div className="mt-5">
                    <h4>Add a challenger match</h4>
                  </div>
                </section>
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default EventEntry;
