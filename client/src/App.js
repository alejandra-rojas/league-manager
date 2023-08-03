import { useEffect, useState } from "react";
import LeagueEntry from "./components/LeagueEntry";
import Modal from "./components/Modal";
import Header from "./components/Header";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const adminEmail = cookies.AdminEmail;
  const [leagues, setLeagues] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  //const authToken = false;

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

  console.log(leagues);

  //Sort by league starting date
  const sortedLeagues = leagues?.sort(
    (a, b) => new Date(a.starting_date) - new Date(b.starting_date)
  );

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
      <h2>Current Leagues</h2>
      {sortedLeagues?.map((league) => (
        <LeagueEntry key={league.id} league={league} getData={getData} />
      ))}

      <h2>Finished leagues</h2>
    </div>
  );
}

export default App;
