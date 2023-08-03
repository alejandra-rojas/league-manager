import React, { useState } from "react";

function Modal({ mode, setShowModal, getData, league }) {
  const editMode = mode === "edit" ? true : false;

  const [data, setData] = useState({
    league_name: editMode ? league.league_name : "",
    starting_date: editMode ? league.starting_date : "",
    midway_point: editMode ? league.midway_point : "",
    end_date: editMode ? league.end_date : "",
    isfinished: league.isfinished,
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
        console.log("Created new league succesfully!");
        setShowModal(false);
        getData();
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
        console.log("edited");
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (e) => {
    console.log("changing", e);
    const { name, value, type, checked } = e.target;

    const newValue = type === "checkbox" ? checked : value;

    setData((data) => ({
      ...data,
      [name]: newValue,
    }));

    console.log(data);
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
            placeholder="ex: 'Women Doubles"
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
          {mode === "edit" && (
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
              <div>
                <button
                  onClick={() => deleteLeague()}
                  className="bg-transparent hover:bg-red-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
                >
                  Delete
                </button>
              </div>
            </>
          )}

          <input
            className={
              "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
            }
            type="submit"
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  );
}

export default Modal;
