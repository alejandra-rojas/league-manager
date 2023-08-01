import { useEffect, useState } from "react";
import LeagueEntry from "./components/LeagueEntry";

function App() {
  const [leagues, setLeagues] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/leagues`);
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
      <h1>Highbury and Islington Leagues</h1>
      <div className="button-container">
        <button>Login</button>
        <button>Add New</button>
        <button>Sign Out</button>
      </div>
      <h2>Current Leagues</h2>
      {sortedLeagues?.map((league) => (
        <LeagueEntry key={league.id} league={league} />
      ))}

      <h2>Finished leagues</h2>
    </div>
  );
}

export default App;
