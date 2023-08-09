import { useLoaderData, useParams } from "react-router-dom";

function PlayerDetails() {
  const { id } = useParams();
  const player = useLoaderData();

  console.log(player);

  return (
    <div>
      <h2>Player {id} Details</h2>

      <h3>Name</h3>
      <p>
        {player[0].player_firstname} {player[0].player_lastname}
      </p>

      <div>
        Contact details:
        <p>{player[0].player_phonenumber}</p>
        <p>{player[0].player_email}</p>
      </div>
    </div>
  );
}

export default PlayerDetails;

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
