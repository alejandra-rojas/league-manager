import "../../styles/Admin/EventEntry.scss";
import React, { useEffect, useState } from "react";
import EventModal from "./EventModal";
import StandingsReport from "./StandingsReport";
import { toast } from "react-toastify";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

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

  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

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
            <div>
              {eventMatchesData.length !== 0 && (
                <div className="event-info">
                  <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <InformationCircleIcon width={25} />
                    {showTooltip && (
                      <div className="tooltip">
                        Once the standings table for an event has been
                        published, the participating teams cannot be altered
                        anymore, unless the team is withdrawing from the event.
                      </div>
                    )}
                  </div>
                  <p>
                    Complete {gevent.midway_matches} matches before the midpoint
                    to get bonus points
                  </p>
                </div>
              )}
              <div className="line"></div>
            </div>

            <div id="event-details">
              {eventMatchesData.length === 0 && (
                <section id="create-event-table">
                  <div className="participants">
                    {eventTeams.length === 0 ? (
                      <p className="text-highlight">
                        There are no participants on this event yet. To add a
                        participant to an event, search for them using the
                        search field below.
                      </p>
                    ) : (
                      <div className="list">
                        <h5>Event Participants</h5>
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

                        <button
                          type="submit"
                          aria-label="Submit search"
                          disabled={!searchString}
                        >
                          <MagnifyingGlassIcon width={25} />
                          <span>search</span>
                        </button>
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
                      </form>
                      {error && <p className="text-red-600">{error}</p>}
                    </div>
                    {searchPerformed && teams.length >= 1 && (
                      <div className="search-results">
                        <h5>Search results:</h5>
                        <ul>
                          {teams.map((team, index) => (
                            <li
                              key={team.team_id}
                              className={
                                index % 2 === 0 ? "even-row" : "odd-row"
                              }
                            >
                              <span>
                                {team.player1_firstname} {team.player1_lastname}
                              </span>
                              <span>&</span>
                              <span>
                                {team.player2_firstname} {team.player2_lastname}
                              </span>

                              <button
                                onClick={() => addTeam(team.team_id)}
                                aria-label={`Add team ${team.player1_firstname} ${team.player1_lastname} & ${team.player2_firstname} ${team.player2_lastname} to event`}
                              >
                                Add team to event
                              </button>
                            </li>
                          ))}
                        </ul>
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
                  <div className="event-table">
                    <h5 className="sr-only">Event Standings</h5>
                    <ul>
                      <li className="md-header">
                        <span>Participant</span>
                        <span>Played</span>
                        <span>Won</span>
                        <span>Lost</span>
                        <span>SW</span>
                        <span>MB</span>
                        <span>AB</span>
                        <span>CB</span>
                        <span>Total Points</span>
                      </li>
                      {eventTeams
                        .sort((a, b) => b.total_points - a.total_points)
                        .map((team, index) => {
                          const activeTeamsCount = eventTeams.filter(
                            (t) => !t.team_withdrawn
                          ).length;
                          //console.log(activeTeamsCount);
                          const totalMatches =
                            calculateCombinations(activeTeamsCount);

                          return (
                            <li
                              key={team.team_id}
                              className={`${
                                team.team_withdrawn ? "withdrawn" : ""
                              } ${index % 2 === 0 ? "even-row" : "odd-row"}`}
                            >
                              <span>
                                {`${team.player1_firstname} ${team.player1_lastname} & ${team.player2_firstname} ${team.player2_lastname}`}
                              </span>
                              <span>{`${team.played_matches}/${totalMatches}`}</span>
                              <span className="hide">{team.team_wins}</span>
                              <span className="hide">
                                {team.played_matches - team.team_wins}
                              </span>
                              <span className="hide">{team.team_sets_won}</span>
                              <span className="hide">{team.mid_bonus}</span>
                              <span className="hide">{team.all_bonus}</span>
                              <span className="hide">
                                {team.challenger_bonus}
                              </span>
                              <span>{team.total_points}</span>
                            </li>
                          );
                        })}
                    </ul>
                  </div>

                  <StandingsReport
                    eventMatchesData={eventMatchesData}
                    getEventMatchesData={getEventMatchesData}
                    getEventTeamsData={getEventTeamsData}
                  />

                  <div id="challenger-match">
                    <h4>Add a challenger match</h4>
                  </div>

                  <div id="team-withdrawal-form">
                    <div>
                      <h6>Withdraw participant</h6>
                    </div>
                    <form>
                      <select
                        id="withdrawal"
                        name="winner_id"
                        value={selectedTeamWId}
                        onChange={(e) => setSelectedTeamWId(e.target.value)}
                        aria-label="Select the player who has withdrawn"
                      >
                        <option value="">Select participant</option>
                        {eventTeams
                          .filter((team) => !team.team_withdrawn) // Filter out teams with team_withdrawal true
                          .map((team) => (
                            <option key={team.team_id} value={team.team_id}>
                              {`${team.player1_firstname} ${team.player1_lastname} & ${team.player2_firstname} ${team.player2_lastname}`}
                            </option>
                          ))}
                      </select>

                      {selectedTeamWId && (
                        <>
                          <button
                            type="submit"
                            onClick={(e) => withdrawTeam(e, selectedTeamWId)}
                            aria-label="Report Withdrawal"
                            disabled={!selectedTeamWId}
                          >
                            Complete withdrawal
                          </button>{" "}
                          <div className="undone">
                            <ExclamationTriangleIcon width={25} />
                            <span>This action cannot be undone</span>
                          </div>
                        </>
                      )}
                    </form>
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
