import { Outlet } from "react-router-dom";
import { useTitle } from "../App";

function TeamsLayout() {
  useTitle("Teams Admin");
  /*   const [teams, setTeams] = useState(null);
  const [showTeamsModal, setShowTeamsModal] = useState(false);

  //Getting teams data
  const getTeamsData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/teams`);
      const json = await response.json();
      setTeams(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => getTeamsData, []); */

  return (
    <>
      <section id="teams-page">
        <Outlet />
      </section>
    </>
  );
}

export default TeamsLayout;
