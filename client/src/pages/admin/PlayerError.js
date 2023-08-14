import { Link, useRouteError } from "react-router-dom";

function PlayerError() {
  const error = useRouteError();
  return (
    <div>
      <h2>Error Page for players</h2>
      <p>{error.message}</p>
      <Link to="/admin/players" aria-label="Return to players page">
        Go back to the players page
      </Link>
    </div>
  );
}

export default PlayerError;
