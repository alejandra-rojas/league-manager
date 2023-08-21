import { NavLink, Outlet } from "react-router-dom";

function LeaguesLayout() {
  return (
    <>
      <section id="admin-secondary-navigation-leagues">
        <hgroup>
          <h2>Leagues Page</h2>
          <p>Manage your leagues</p>
        </hgroup>
        <nav
          aria-labelledby="admin-secondary-navigation-leagues"
          className="flex gap-6 justify-center bg-slate-500 py-5 my-5"
        >
          <NavLink
            to={"/admin/leagues"}
            aria-label="Go to ongoing leagues page"
          >
            Ongoing
          </NavLink>
          <NavLink to={"upcoming"} aria-label="Go to upcoming leagues page">
            Upcoming
          </NavLink>
          <NavLink to={"finished"} aria-label="Go to finished leagues page">
            Finished
          </NavLink>
        </nav>
        <Outlet />
      </section>
    </>
  );
}

export default LeaguesLayout;
