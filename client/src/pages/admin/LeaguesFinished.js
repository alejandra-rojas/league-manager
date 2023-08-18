import React, { useEffect, useState } from "react";
import LeagueEntry from "../../components/Admin/LeagueEntry";

function LeaguesFinished() {
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
    <div>
      <div>
        <h2>Finished leagues // isfinished attribute = true</h2>
        {finishedLeagues?.map((league) => (
          <LeagueEntry key={league.id} league={league} getData={getData} />
        ))}
      </div>
    </div>
  );
}

export default LeaguesFinished;
