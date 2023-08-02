import { useEffect, useState } from "react";
import LeagueEntry from "./components/LeagueEntry";
import Modal from "./components/Modal";
import Header from "./components/Header";
import Auth from "./components/Auth";

function App() {
  const [leagues, setLeagues] = useState(null);

  const authToken = false;

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
      {!authToken && <Auth />}
      {authToken && <Header getData={getData} />}
      <h2>Current Leagues</h2>
      {sortedLeagues?.map((league) => (
        <LeagueEntry key={league.id} league={league} getData={getData} />
      ))}

      <h2>Finished leagues</h2>
    </div>
  );
}

export default App;
