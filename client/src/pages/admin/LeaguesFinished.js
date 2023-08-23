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
      <div>
        <h3>Finished Leagues</h3>
        <p>
          Leagues that have finished and were all scores have been reported.
        </p>
      </div>

      <section id="current-leagues" className="flex flex-col gap-20">
        <ul className="flex flex-col gap-5">
          {finishedLeagues?.map((league) => (
            <LeagueEntry key={league.id} league={league} getData={getData} />
          ))}
        </ul>
      </section>
    </>
  );
}

export default LeaguesFinished;
