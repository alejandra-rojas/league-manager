import "../../styles/Admin/Leagues.scss";
import { useEffect, useState } from "react";
import LeagueEntry from "../../components/Admin/LeagueEntry";
import { useTitle } from "../../App";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import LeagueModal from "../../components/Admin/LeagueModal";

function Leagues() {
  useTitle("Current Leagues");
  const [showModal, setShowModal] = useState(false);
  const [leagues, setLeagues] = useState(null);
  const today = new Date();

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

  // useEffect(() => {
  //   if (authToken){
  //     getData()
  //   }
  // }, []);

  useEffect(() => getData, []);

  //console.log(leagues);

  //Not finished leagues
  const unfinishedLeagues = leagues?.filter((league) => !league.isfinished);

  //Ongoing leagues sorted by  starting date
  const sortedLeagues = unfinishedLeagues
    ?.filter((league) => {
      const leagueStartDate = new Date(league.starting_date);
      return leagueStartDate <= today;
    })
    .sort((a, b) => new Date(a.starting_date) - new Date(b.starting_date));

  return (
    <>
      <section id="leagues-layout-header">
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
                <a to={"ongoing"} aria-label="Go to ongoing leagues page">
                  Current
                </a>
              </li>
              <li>
                <a to={"finished"} aria-label="Go to finished leagues page">
                  Finished
                </a>
              </li>

              <li>
                <a onClick={() => setShowModal(true)} className="create-league">
                  <PlusCircleIcon width={35} />
                  <span>
                    New <span className="">league</span>
                  </span>
                </a>
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
      )}
      <section id="current-leagues">
        <header id="league-section-header" className="sr-only">
          <h2>Ongoing and Future Leagues</h2>
          <p>
            Leagues that are not finished and todays date is within the range of
            the start and end date
          </p>
        </header>

        <section id="current-leagues-data">
          <ul>
            {unfinishedLeagues?.map((league) => (
              <LeagueEntry key={league.id} league={league} getData={getData} />
            ))}
          </ul>
        </section>
      </section>
    </>
  );
}

export default Leagues;
