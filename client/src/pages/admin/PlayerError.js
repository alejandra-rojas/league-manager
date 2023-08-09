import { Link, useRouteError } from "react-router-dom";

function PlayerError() {
  const error = useRouteError();
  return (
    <div>
      <h2>Error</h2>
      <p>{error.message}</p>
      <Link to="/admin/players">Go back to the players page</Link>
    </div>
  );
}

export default PlayerError;
