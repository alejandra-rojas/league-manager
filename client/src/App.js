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
      <h1 className="text-3xl font-bold underline">
        Highbury and Islington Leagues
      </h1>
      <div className="inline-flex">
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
          Login
        </button>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4">
          Create League
        </button>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
          Sign Out
        </button>
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
