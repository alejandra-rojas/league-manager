import { useLoaderData, useParams } from "react-router-dom";
import { useTitle } from "../../App";

function PlayerPage() {
  const { id } = useParams();
  const player = useLoaderData();
  useTitle(
    `Player Page - ${player[0].player_firstname} ${player[0].player_lastname}`
  );
  //console.log(player);

  return (
    <section>
      <header>
        <h3>
          Player page: {player[0].player_firstname} {player[0].player_lastname}
        </h3>
      </header>

      <div>
        <h3>Contact details</h3>
        <p>Phone: {player[0].player_phonenumber}</p>
        <p>Email: {player[0].player_email}</p>
        <p>Player id: {id}</p>
      </div>

      <div>Stadistics showing up here soon.</div>
    </section>
  );
}

export default PlayerPage;

//Loader function
export const playerDetailsLoader = async ({ params }) => {
  const { id } = params;
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVERURL}/players/${id}`
    );
    console.log(response);
    if (!response.ok) {
      throw Error("Player not found");
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
};
