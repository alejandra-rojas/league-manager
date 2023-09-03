import React, { useEffect, useState } from "react";
import LeagueEntry from "../../components/Admin/LeagueEntry";
import { useTitle } from "../../App";

function LeaguesFinished() {
  useTitle("Finished Leagues");
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

  //Finished leagues
  const finishedLeagues = leagues?.filter((league) => league.isfinished);

  return (
    <>
      <section id="finished-leagues">
        <header id="league-section-header" className="sr-only">
          <h2>Finished Leagues</h2>
          <p>
            Leagues that have finished and were all scores have been reported.
          </p>
        </header>

        <section id="current-leagues-data">
          <ul className="flex flex-col gap-5">
            {finishedLeagues?.map((league) => (
              <LeagueEntry key={league.id} league={league} getData={getData} />
            ))}
          </ul>
        </section>
      </section>
    </>
  );
}

export default LeaguesFinished;
