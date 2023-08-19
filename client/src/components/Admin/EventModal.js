import React, { useState } from "react";

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
        getEventsData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-end absolute top-0 left-0 h-screen w-screen bg-black bg-opacity-75 ">
      <div className="h-auto bg-white px-10 py-10 rounded-xl shadow-xl ring-1 ring-gray-900/5">
        <div className="flex justify-between pb-3">
          <h3 className="text-xl font-bold">{mode} group</h3>
          <button
            className="border"
            onClick={() => {
              setShowEventModal(false);
            }}
          >
            X
          </button>
        </div>
        <form className="flex-col">
          <label htmlFor="eventName">Event name:</label>
          <input
            id="eventName"
            required
            maxLength={30}
            placeholder="Division A"
            name="event_name"
            value={data.event_name}
            onChange={handleChange}
            className="my-3 mx-0 py-3 px-4 rounded-xl border border-gray-200"
          />
          <br />
          <label htmlFor="bonusMatches">
            Matches to play to midpoint bonus points:
          </label>
          <input
            id="bonusMatches"
            required
            maxLength={1}
            placeholder="3"
            name="midway_matches"
            value={data.midway_matches}
            onChange={handleChange}
            className="my-3 mx-0 py-3 px-4 rounded-xl border border-gray-200"
          />
          <br />

          <input
            className={
              "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
            }
            type="submit"
            onClick={editGroupMode ? editGroupData : postGroupData}
          />

          {mode === "edit" && (
            <>
              <div>
                <button
                  onClick={() => deleteEvent()}
                  className="bg-transparent hover:bg-red-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default EventModal;
