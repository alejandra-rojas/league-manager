import { NavLink, Outlet } from "react-router-dom";

function LeaguesLayout() {
  return (
    <>
      <nav className="flex gap-6 justify-center bg-slate-500 py-5 my-5">
        <NavLink to={"/admin/leagues"} aria-label="Go to current leagues page">
          Current
        </NavLink>
        <NavLink to={"upcoming"} aria-label="Go to upcoming leagues page">
          Upcoming
        </NavLink>
        <NavLink to={"finished"} aria-label="Go to finished leagues page">
          Finished
        </NavLink>
      </nav>

      <Outlet />
    </>
  );
}

export default LeaguesLayout;
