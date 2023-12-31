import "../../styles/Admin/Leagues.scss";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/solid";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import LeagueModal from "./LeagueModal";
import EventModal from "./EventModal";
import EventEntry from "./EventEntry";
import ChallengerMatchModal from "./ChallengerMatchReportModal";

export default function LeagueEntry({ league, getData }) {
  const [showModal, setShowModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showChallengerModal, setShowChallengerModal] = useState(false);

  const lowercaseTitle = league.league_name.toLowerCase();
  const [leagueEvents, setLeagueEvents] = useState(null);
  //console.log(league);
  const [challengerMatchesData, setChallengerMatchesData] = useState([]);

  const isFinished = league.isfinished;
  const startDate = new Date(league.starting_date);
  const endDate = new Date(league.end_date);
  const midDate = new Date(league.midway_point);
  const today = new Date();
  const registrationCutoff = new Date(startDate);
  registrationCutoff.setDate(startDate.getDate() - 2); // Two days before the start
  let daysLeft;
  let message;
  const hasStarted = today >= startDate;

  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  const formattedTodaysDate = formatDateToYYYYMMDD(today);

  if (today < registrationCutoff) {
    // Calculate days left to join
    const daysToJoin = Math.ceil(
      (registrationCutoff - today) / (1000 * 3600 * 24)
    );
    daysLeft = daysToJoin;
    message =
      daysLeft === 1
        ? "day left to join the league"
        : "days left to join the league";
  } else if (today >= startDate && today < endDate) {
    // Calculate days left of play
    const daysOfPlay = Math.ceil((endDate - today) / (1000 * 3600 * 24));
    daysLeft = daysOfPlay;
    message = daysLeft === 1 ? "day left of play" : "days left of play";
  } else if (league.end_date === formattedTodaysDate) {
    // Last day to play
    message = "Today is the last day to complete a match";
  } else {
    // No days left, either league hasn't started or has already ended
    message =
      "Once all the results are entered, set the league to finished via the edit league modal.";
  }

  //Getting the events for each particular league
  const getEventsData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/leagues/${league.id}/events`
      );
      const json = await response.json();
      setLeagueEvents(json);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => getEventsData, []);

  //Getting all challenger matches for the league
  const getChallengersData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/leagues/${league.id}/challengers`
      );
      const json = await response.json();
      setChallengerMatchesData(json);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => getChallengersData, []);

  return (
    <li className="league-single-entry">
      {!showModal && (
        <header className="league-info">
          <div>
            <div className="league-title">
              <h3>{league.league_name}</h3>
              <button
                onClick={() => setShowModal(true)}
                aria-label="Show 'Edit League' Modal"
              >
                Edit league
              </button>
            </div>
            <div className="league-dates">
              <p>
                {startDate.toDateString()} to {endDate.toDateString()}
              </p>
              <p>Midpoint: {midDate.toDateString()}</p>
            </div>
          </div>
          <div className="league-stats">
            {/*           <p>
            {leagueEvents.length}{" "}
            {leagueEvents.length === 1 ? "event" : "events"}
          </p> */}

            {!isFinished && (
              <p
                className={
                  message ===
                  "Once all the results are entered, set the league to finished via the edit league modal."
                    ? "text-highlight"
                    : "days-left"
                }
              >
                {league.end_date < formattedTodaysDate && (
                  <ExclamationTriangleIcon width={40} />
                )}
                {daysLeft} {message}
              </p>
            )}
          </div>
        </header>
      )}
      {showModal && (
        <LeagueModal
          mode={"edit"}
          setShowModal={setShowModal}
          getData={getData}
          league={league}
          today={today}
        />
      )}
      <section id="events-section">
        {leagueEvents && (
          <div className="event-container">
            <ul>
              {leagueEvents.map((gevent) => (
                <li key={gevent.event_id}>
                  <EventEntry
                    league={league}
                    gevent={gevent}
                    getEventsData={getEventsData}
                    getChallengersData={getChallengersData}
                    challengerMatchesData={challengerMatchesData}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
        {!showChallengerModal && hasStarted && (
          <button
            onClick={() => setShowChallengerModal(true)}
            className="add-challenger"
          >
            <PlusIcon width={25} />
            <h6>Add a challenger match</h6>
          </button>
        )}
        {showChallengerModal && (
          <ChallengerMatchModal
            league={league}
            setShowChallengerModal={setShowChallengerModal}
            getChallengersData={getChallengersData}
          />
        )}
        {showEventModal && (
          <EventModal
            mode={"new"}
            setShowEventModal={setShowEventModal}
            league={league}
            getEventsData={getEventsData}
            leagueEvents={leagueEvents}
          />
        )}
        {!hasStarted && (
          <button
            onClick={() => setShowEventModal(true)}
            aria-label="Opel Modal to add an event to this league"
            className="add-event"
          >
            <PlusCircleIcon width={30} />
            Add event to {lowercaseTitle}
          </button>
        )}
      </section>
    </li>
  );
}
