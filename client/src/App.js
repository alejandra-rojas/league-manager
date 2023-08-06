import { useEffect, useState } from "react";
import LeagueEntry from "./components/LeagueEntry";
import Header from "./components/Header";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const adminEmail = cookies.Email;
  const [showLogin, setShowLogin] = useState(false);
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
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold underline">
          Highbury and Islington Leagues
        </h1>
        {!authToken && (
          <div className="inline-flex">
            <button
              onClick={() => setShowLogin(true)}
              className={`bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l `}
            >
              Admin Login
            </button>
          </div>
        )}
      </div>
      {showLogin && <Auth setShowLogin={setShowLogin} />}
      {authToken && (
        <>
          <Header getData={getData} />
          <p></p>
        </>
      )}

      <div className="flex flex-col gap-20">
        <div>
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
    </div>
  );
}

export default App;
