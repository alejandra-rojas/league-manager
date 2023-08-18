import React, { useState } from "react";
import { toast } from "react-toastify";

function LeagueModal({ mode, setShowModal, getData, league, today }) {
  const editMode = mode === "edit" ? true : false;
  const [error, setError] = useState(null);

  const [data, setData] = useState({
    league_name: editMode ? league.league_name : "",
    starting_date: editMode ? league.starting_date : "",
    midway_point: editMode ? league.midway_point : "",
    end_date: editMode ? league.end_date : "",
    isfinished: editMode ? league.isfinished : "",
  });

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/leagues`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (response.status === 200) {
        //console.log("Created new league succesfully!");
        setShowModal(false);
        getData();
        toast.success(`${data.league_name} league created `);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/leagues/${league.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (response.status === 200) {
        //console.log("edited");
        setShowModal(false);
        getData();
        toast.success(`${data.league_name} has been modified succesfully`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    //console.log("changing", e);
    const { name, value, type, checked } = e.target;

    const newValue = type === "checkbox" ? checked : value;

    setData((data) => ({
      ...data,
      [name]: newValue,
    }));
    //console.log(data);

    if (
      name === "midway_point" &&
      (new Date(value) <= new Date(data.starting_date) ||
        new Date(value) >= new Date(data.end_date))
    ) {
      setError(
        "Midpoint date must be after the start date and before the end date."
      );
    } else if (
      name === "end_date" &&
      new Date(value) <= new Date(data.midway_point)
    ) {
      setError("End date must be after the mid date.");
    } else {
      setError("");
    }
  };

  const deleteLeague = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/leagues/${league.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 200) {
        toast.success(`League has been deleted`);
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-end absolute top-0 left-0 h-screen w-screen bg-black bg-opacity-75 ">
      <div className="h-auto bg-white px-10 py-10 rounded-xl shadow-xl ring-1 ring-gray-900/5">
        <div className="flex justify-between pb-3">
          <h3 className="text-xl font-bold">{mode} a new league</h3>
          <button
            className="border"
            onClick={() => {
              setShowModal(false);
            }}
          >
            X
          </button>
        </div>
        <form className="flex-col">
          <label htmlFor="leagueName">League name:</label>
          <input
            id="leagueName"
            required
            maxLength={30}
            placeholder="Women Doubles"
            name="league_name"
            value={data.league_name}
            onChange={handleChange}
            className="my-3 mx-0 py-3 px-4 rounded-xl border border-gray-200"
          />
          <br />
          <label htmlFor="startDate">Start date:</label>
          <input
            id="startDate"
            required
            type="date"
            name="starting_date"
            value={data.starting_date}
            onChange={handleChange}
            className="my-3 mx-0 py-3 px-4 rounded-xl border border-gray-200"
          />
          <br />
          <label htmlFor="midPoint">Midway point:</label>
          <input
            id="midPoint"
            name="midway_point"
            required
            type="date"
            value={data.midway_point}
            onChange={handleChange}
            className="my-3 mx-0 py-3 px-4 rounded-xl border border-gray-200"
          />

          <br />
          <label htmlFor="endDate">End date:</label>
          <input
            id="endDate"
            name="end_date"
            required
            type="date"
            value={data.end_date}
            onChange={handleChange}
            className="my-3 mx-0 py-3 px-4 rounded-xl border border-gray-200"
          />
          <br />
          <br />
          {mode === "edit" && today >= new Date(league.end_date) && (
            <>
              <div>
                <input
                  id="isFinished"
                  type="checkbox"
                  name="isfinished"
                  checked={data.isfinished}
                  onChange={handleChange}
                />
                <label htmlFor="isFinished">
                  The league is finished and all the results are entered
                </label>
              </div>
            </>
          )}
          <br />
          <br />
          {!error && (
            <input
              className={
                "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
              }
              type="submit"
              onClick={editMode ? editData : postData}
            />
          )}
        </form>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <button
            onClick={() => deleteLeague()}
            className="bg-transparent hover:bg-red-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeagueModal;
