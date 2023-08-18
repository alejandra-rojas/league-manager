import React, { useEffect, useState } from "react";
import LeagueEntry from "../../components/Admin/LeagueEntry";

function LeaguesUpcoming() {
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
    <div>
      <div>
        <h2>Upcoming Leagues - Todays date has not reached the start date</h2>
        {upcomingLeagues?.map((league) => (
          <LeagueEntry key={league.id} league={league} getData={getData} />
        ))}
      </div>
    </div>
  );
}

export default LeaguesUpcoming;
