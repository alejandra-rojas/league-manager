import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import LeagueModal from "../components/Admin/LeagueModal";
import { useTitle } from "../App";

function LeaguesLayout() {
  useTitle("Leagues Admin");
  const [showModal, setShowModal] = useState(false);
  const [leagues, setLeagues] = useState(null);

  //Getting leagues data
  const getData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/leagues`
      );
      const json = await response.json();
      setLeagues(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => getData, []);

  return (
    <>
      <div className="flex justify-between">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          onClick={() => setShowModal(true)}
        >
          Create League
        </button>

        <a href="#leaguescontent" className="sr-only">
          Skip to leagues section content
        </a>
        <section id="admin-secondary-navigation-leagues">
          <nav
            aria-labelledby="admin-secondary-navigation-leagues-label"
            className="flex gap-6 justify-center bg-slate-500 py-5 my-5"
          >
            <h2
              id="admin-secondary-navigation-leagues-label"
              className="sr-only"
            >
              Navigation for Leagues Section
            </h2>
            <ul className="flex gap-4">
              <li>
                <NavLink
                  to={"ongoing"}
                  aria-label="Go to ongoing leagues page"
                  className={({ isActive }) => (isActive ? "bg-green-600" : "")}
                >
                  Ongoing
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"upcoming"}
                  aria-label="Go to upcoming leagues page"
                  className={({ isActive }) => (isActive ? "bg-green-600" : "")}
                >
                  Upcoming
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"finished"}
                  aria-label="Go to finished leagues page"
                  className={({ isActive }) => (isActive ? "bg-green-600" : "")}
                >
                  Finished
                </NavLink>
              </li>
            </ul>
          </nav>
        </section>
      </div>

      {showModal && (
        <LeagueModal
          mode={"create"}
          setShowModal={setShowModal}
          getData={getData}
        />
      )}
      <section id="leagues-content">
        <Outlet />
      </section>
    </>
  );
}

export default LeaguesLayout;
