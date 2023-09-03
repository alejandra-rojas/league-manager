import "../styles/Admin/LeaguesLayout.scss";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

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
      {/* <section id="leagues-layout-header">
        <h2>Leagues admin page</h2>

        <a href="#leaguescontent" className="sr-only">
          Skip to leagues section content
        </a>
        <section id="admin-secondary-navigation-leagues">
          <nav aria-labelledby="admin-secondary-navigation-leagues-label">
            <div
              id="admin-secondary-navigation-leagues-label"
              className="sr-only"
            >
              Navigation for Leagues Section
            </div>
            <ul>
              <li>
                <NavLink
                  to={"ongoing"}
                  aria-label="Go to ongoing leagues page"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Current
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"upcoming"}
                  aria-label="Go to upcoming leagues page"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Upcoming
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"finished"}
                  aria-label="Go to finished leagues page"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Finished
                </NavLink>
              </li>
              <li>
                <button
                  onClick={() => setShowModal(true)}
                  className="create-league"
                >
                  <PlusCircleIcon width={35} />
                  <span>
                    New <span className="">league</span>
                  </span>
                </button>
              </li>
            </ul>
          </nav>
        </section>
      </section>

      {showModal && (
        <LeagueModal
          mode={"create"}
          setShowModal={setShowModal}
          getData={getData}
        />
      )} */}
      <section id="leagues-layout-content">
        <Outlet />
      </section>
    </>
  );
}

export default LeaguesLayout;
