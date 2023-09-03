import "../styles/Admin/PlayersPage.scss";
import { Outlet } from "react-router-dom";
import { useTitle } from "../App";

export default function PlayersLayout() {
  useTitle("Players Admin");
  /*   const [players, setPlayers] = useState(null);
  const [showPlayerModal, setShowPlayerModal] = useState(false);

  //Getting players data
  const getPlayersData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/players`
      );
      const json = await response.json();
      setPlayers(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => getPlayersData, []);
  //console.log(players); */

  return (
    <>
      <section id="players-page">
        <Outlet />
      </section>
    </>
  );
}
