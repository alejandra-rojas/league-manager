import React, { useEffect, useState } from "react";
import LeagueEntry from "../../components/Admin/LeagueEntry";
import { useTitle } from "../../App";

function LeaguesUpcoming() {
  useTitle("Upcoming Leagues");
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

  useEffect(() => getData, []);

  //Upcoming leagues
  const upcomingLeagues = leagues
    ?.filter((league) => !league.isfinished)
    .filter((league) => {
      const leagueStartDate = new Date(league.starting_date);
      return leagueStartDate >= today;
    });

  return (
    <>
      <div>
        <h3>Upcoming Leagues</h3>
        <p>Leagues that have not started yet</p>
      </div>

      <section id="current-leagues" className="flex flex-col gap-20">
        <ul className="flex flex-col gap-5">
          {upcomingLeagues?.map((league) => (
            <LeagueEntry key={league.id} league={league} getData={getData} />
          ))}
        </ul>
      </section>
    </>
  );
}

export default LeaguesUpcoming;
