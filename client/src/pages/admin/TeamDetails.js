import { useLoaderData, useParams } from "react-router-dom";

function TeamDetails() {
  const { id } = useParams();
  const team = useLoaderData();
  //console.log(team);

  return (
    <div>
      <div>
        <h2>Team {team.team_id} Details</h2>

        <h3>Players:</h3>
        <p>
          {team.player1_firstname} {team.player1_lastname}
        </p>
        <p>
          {team.player2_firstname} {team.player2_lastname}
        </p>

        <div>Stadistics:</div>
      </div>
    </div>
  );
}

export default TeamDetails;

//Loader function
export const teamDetailsLoader = async ({ params }) => {
  const { id } = params;
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVERURL}/teams/${id}`
    );
    console.log(response);
    if (!response.ok) {
      throw Error("Team not found");
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
};
