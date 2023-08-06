import React, { useEffect, useState } from "react";
import LeagueModal from "./LeagueModal";
import GroupEntry from "./EventEntry";
import GroupModal from "./EventModal";
import EventModal from "./EventModal";
import EventEntry from "./EventEntry";

export default function LeagueEntry({ league, getData, message }) {
  const [showModal, setShowModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const lowercaseTitle = league.league_name.toLowerCase();
  const [leagueEvents, setLeagueEvents] = useState(null);

  const isFinished = league.isfinished;

  const differenceInTime =
    new Date(league.end_date) - new Date(league.starting_date);

  let remainingDays;
  if (differenceInTime >= 0) {
    remainingDays = differenceInTime / (1000 * 3600 * 24);
  } else if (differenceInTime < 0) {
    remainingDays = 0;
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
      <div className="flex justify-between">
        <h2>{league.league_name}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
          >
            Edit
          </button>
        </div>
      </div>
      <div className="pt-4 pb-6 border-solid border-black-20 border-b-2 mb-6">
        <p>
          Start date: {league.starting_date} | End date: {league.end_date}
        </p>

        <p>Midway point: {league.midway_point}</p>
        <p>Number of groups in league: {league.league_events}</p>

        {!isFinished && (
          <h3>
            {remainingDays} {message}
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
            Add group to {lowercaseTitle} league
          </button>
        </>
      )}
      {showModal && (
        <LeagueModal
          mode={"edit"}
          setShowModal={setShowModal}
          getData={getData}
          league={league}
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
