import { useState, useEffect } from "react";
import { useTitle } from "../App";

function Home() {
  useTitle("H&I Tennis Leagues");
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
  return <div>Public Home</div>;
}

export default Home;
