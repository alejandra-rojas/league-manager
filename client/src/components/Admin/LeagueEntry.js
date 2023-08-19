import React, { useEffect, useState } from "react";
import LeagueModal from "./LeagueModal";
import EventModal from "./EventModal";
import EventEntry from "./EventEntry";

export default function LeagueEntry({ league, getData }) {
  const [showModal, setShowModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const lowercaseTitle = league.league_name.toLowerCase();
  const [leagueEvents, setLeagueEvents] = useState(null);
  //console.log(league);

  const isFinished = league.isfinished;
  const startDate = new Date(league.starting_date);
  const endDate = new Date(league.end_date);
  const today = new Date();
  const registrationCutoff = new Date(startDate);
  registrationCutoff.setDate(startDate.getDate() - 2); // Two days before the start
  let daysLeft;
  let message;

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
      "The end date for the league has passed. Once all the results are entered, set the league to finished via the edit modal";
  }

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

  return (
    <div className="bg-gray-100 px-6 pt-10 pb-8 shadow-s ring-1 ring-gray-900/5  sm:rounded-lg sm:px-10">
      <div className="flex gap-7 items-center">
        <h2>{league.league_name}</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
        >
          Edit
        </button>
      </div>
      <div className="pt-4 pb-6 border-solid border-black-20 border-b-2 mb-6">
        <p>
          Start date: {league.starting_date} | End date: {league.end_date}
        </p>
        <p>Midway point: {league.midway_point}</p>

        {!isFinished && (
          <h3>
            {daysLeft} {message}
          </h3>
        )}
      </div>
      {!isFinished && (
        <>
          {leagueEvents && (
            <>
              <p>There are {leagueEvents.length} events in this league </p>
              {leagueEvents?.map((gevent) => (
                <EventEntry
                  key={gevent.event_id}
                  gevent={gevent}
                  getEventsData={getEventsData}
                />
              ))}
            </>
          )}
          <button
            onClick={() => setShowEventModal(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded-full"
          >
            Add event or group to {lowercaseTitle}
          </button>
        </>
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

      {showEventModal && (
        <EventModal
          mode={"new"}
          setShowEventModal={setShowEventModal}
          league={league}
          getEventsData={getEventsData}
          leagueEvents={leagueEvents}
        />
      )}
    </div>
  );
}
