import { NavLink, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import Auth from "../components/Admin/Auth";
import AuthHeader from "../components/Admin/AuthHeader";

function AdminLayout() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;

  return (
    <section>
      <div className="flex justify-between">{!authToken && <Auth />}</div>
      {authToken && <AuthHeader />}
      {authToken && (
        <>
          <nav className="flex gap-6 justify-center bg-slate-500 py-5 my-5">
            <NavLink to={"/admin"} aria-label="Go to leagues section">
              Leagues
            </NavLink>
            <NavLink to={"players"} aria-label="Go to players section">
              Players
            </NavLink>
            <NavLink to={"teams"} aria-label="Go to teams section">
              Teams
            </NavLink>
          </nav>

          <Outlet />
        </>
      )}
    </section>
  );
}

export default AdminLayout;
