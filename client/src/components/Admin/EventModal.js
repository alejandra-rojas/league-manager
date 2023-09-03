import React, { useState } from "react";
import { toast } from "react-toastify";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";

function EventModal({
  mode,
  setShowEventModal,
  league,
  getEventsData,
  getEventTeamsData,
  gevent,
}) {
  const editGroupMode = mode === "edit" ? true : false;

  const [data, setData] = useState({
    event_name: editGroupMode ? gevent.event_name : "",
    midway_matches: editGroupMode ? gevent.midway_matches : "",
  });

  const handleChange = (e) => {
    //console.log("changing", e);
    const { name, value } = e.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));
    //console.log(data);
  };

  const postGroupData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/leagues/${league.id}/events`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        console.log("Created new event succesfully!");
        setShowEventModal(false);
        getEventsData();
        toast.success(`${data.event_name} event created`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editGroupData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/events/${gevent.event_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        console.log("Event was edited!");
        setShowEventModal(false);
        getEventsData();
        getEventTeamsData();
        toast.success(`${data.event_name} event edited`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEvent = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/events/${gevent.event_id}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 200) {
        toast.success(`${data.event_name} event deleted`);
        getEventsData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section id="event-modal" className={mode === "edit" ? "edit" : "new"}>
      <div className="container">
        <div className="control">
          <h3>{mode} event</h3>
          <button
            aria-label="Close new or edit event modal"
            onClick={() => {
              setShowEventModal(false);
            }}
          >
            <XMarkIcon width={25} />
            <span>close</span>
          </button>
        </div>
        <form>
          <fieldset>
            <legend className="sr-only">
              {mode === "edit" ? "Edit event" : "New event"}
            </legend>
            <div className="input">
              <label htmlFor="eventName">Event name:</label>
              <input
                id="eventName"
                required
                aria-required="true"
                maxLength={30}
                placeholder="Division A"
                name="event_name"
                value={data.event_name}
                onChange={handleChange}
              />
            </div>

            <div className="input">
              <label htmlFor="bonusMatches">
                Matches to play for midpoint bonus:
              </label>
              <input
                id="bonusMatches"
                required
                maxLength={1}
                placeholder="3"
                name="midway_matches"
                value={data.midway_matches}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              onClick={editGroupMode ? editGroupData : postGroupData}
              aria-label={editGroupMode ? "Edit event" : "Create new event"}
            >
              {editGroupMode ? "Edit event" : "Create event"}
            </button>
          </fieldset>

          {mode === "edit" && (
            <button
              onClick={() => deleteEvent()}
              aria-label="Delete event from this league"
            >
              <TrashIcon width={20} />
              Delete event
            </button>
          )}
        </form>
      </div>
    </section>
  );
}

export default EventModal;
