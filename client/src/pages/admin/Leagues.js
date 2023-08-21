import { useEffect, useState } from "react";
import LeagueEntry from "../../components/Admin/LeagueEntry";
import LeagueModal from "../../components/Admin/LeagueModal";

function Leagues() {
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

  const today = new Date();

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
      <hgroup>
        <h3>Current Leagues</h3>
        <p>
          Not finished and todays date is within the range of start/end date
        </p>
      </hgroup>

      <div className="flex flex-col gap-20">
        <div className="flex flex-col gap-5">
          <h2>-</h2>
          {sortedLeagues?.map((league) => (
            <LeagueEntry key={league.id} league={league} getData={getData} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Leagues;
