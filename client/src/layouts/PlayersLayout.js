import { NavLink, Outlet } from "react-router-dom";

export default function PlayersLayout() {
  return (
    <>
      <section>
        <hgroup>
          <h2>Players Page</h2>
          <p>Manage your players database and access individual player pages</p>
        </hgroup>

        <Outlet />
      </section>
    </>
  );
}
