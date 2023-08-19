import { NavLink, Outlet } from "react-router-dom";

export default function PlayersLayout() {
  return (
    <div>
      <h2>Player Details Page</h2>
      <Outlet />
    </div>
  );
}
