import React, { useEffect, useState } from "react";
import EventModal from "./EventModal";

function EventEntry({ gevent }) {
  const [showEventModal, setShowEventModal] = useState(false);
  const [groupEvents, setGroupEvents] = useState(null);

  const getEventsData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/leagues/${gevent.event_id}/events`
      );
      const json = await response.json();
      setGroupEvents(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => getEventsData, []);

  console.log(gevent);
  return (
    <div className="bg-gray-300 p-3 mb-2 flex justify-between items-center">
      <h3>{gevent.event_name}</h3>
      <div className="flex gap-3">
        <button onClick={() => setShowEventModal(true)}>Edit</button>
        <p className="p-1 border">+</p>
      </div>
      {showEventModal && (
        <EventModal
          mode={"edit"}
          setShowEventModal={setShowEventModal}
          getEventsData={getEventsData}
          gevent={gevent}
        />
      )}
    </div>
  );
}

export default EventEntry;
