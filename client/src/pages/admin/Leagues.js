import { useEffect, useState } from "react";
import LeagueEntry from "../../components/Admin/LeagueEntry";
import LeagueModal from "../../components/Admin/LeagueModal";

function Leagues() {
  const [showModal, setShowModal] = useState(false);
  const [leagues, setLeagues] = useState(null);

  // Getting data only if we are logged in
  /*   useEffect(()=>{
      if(authToken){
        getData()
      }
    }, []) */

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

  //Getting events data

  //Getting players/teams data

  //Upcoming leagues
  const today = new Date();
  const upcomingLeagues = leagues
    ?.filter((league) => !league.isfinished)
    .filter((league) => {
      const leagueStartDate = new Date(league.starting_date);
      return leagueStartDate >= today;
    });

  //Ongoing leagues sorted by  starting date
  const sortedLeagues = leagues
    ?.filter((league) => {
      const leagueStartDate = new Date(league.starting_date);
      return leagueStartDate <= today;
    })
    .sort((a, b) => new Date(a.starting_date) - new Date(b.starting_date));

  //Finished leagues
  const finishedLeagues = leagues?.filter((league) => league.isfinished);

  return (
    <>
      <div className="flex justify-end">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          onClick={() => setShowModal(true)}
        >
          Create League
        </button>
      </div>

      <div className="flex flex-col gap-20">
        <div className="flex flex-col gap-5">
          <h2>
            Current Leagues - Not finished and todays date is within the range
            of start/end date
          </h2>
          {sortedLeagues?.map((league) => (
            <LeagueEntry
              key={league.id}
              league={league}
              getData={getData}
              message={"days left of play"}
            />
          ))}
        </div>
        <div>
          <h2>Upcoming Leagues - Todays date has not reached the start date</h2>
          {upcomingLeagues?.map((league) => (
            <LeagueEntry
              key={league.id}
              league={league}
              getData={getData}
              message={"days left to join"}
            />
          ))}
        </div>
        <div>
          <h2>Finished leagues // isfinished attribute = true</h2>
          {finishedLeagues?.map((league) => (
            <LeagueEntry key={league.id} league={league} getData={getData} />
          ))}
        </div>
      </div>
      {showModal && (
        <LeagueModal
          mode={"create"}
          setShowModal={setShowModal}
          getData={getData}
        />
      )}
    </>
  );
}

export default Leagues;
