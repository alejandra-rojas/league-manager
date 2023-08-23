import { NavLink, Outlet } from "react-router-dom";
import { useTitle } from "../App";

export default function PlayersLayout() {
  useTitle("Players Admin");
  return (
    <>
      <section>
        <header>
          <h2>Players Page</h2>
          <p>Manage your players database and access individual player pages</p>
        </header>

        <Outlet />
      </section>
    </>
  );
}
