import React, { useEffect, useState } from "react";
import EventModal from "./EventModal";

function EventEntry({ gevent, getEventsData }) {
  const [showEventModal, setShowEventModal] = useState(false);
  const [groupEvents, setGroupEvents] = useState(null);

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
