import { NavLink, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import Auth from "../components/Admin/Auth";
import AuthHeader from "../components/Admin/AuthHeader";

function AdminLayout() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;

  return (
    <>
      {!authToken && <Auth />}

      {authToken && (
        <>
          <section id="admin-primary-navigation">
            <header>
              <a href="#leaguessection" className="sr-only">
                Skip to leagues section navigation
              </a>
              <AuthHeader />
              <nav
                aria-labelledby="admin-primary-navigation-label"
                className="flex gap-6 justify-center bg-slate-500 py-5 my-5"
              >
                <h2 id="admin-primary-navigation-label" className="sr-only">
                  Primary Navigation for Admin
                </h2>
                <NavLink
                  to={"/admin/leagues"}
                  aria-label="Go to leagues section"
                >
                  Leagues
                </NavLink>
                <NavLink to={"players"} aria-label="Go to players section">
                  Players
                </NavLink>
                <NavLink to={"teams"} aria-label="Go to teams section">
                  Teams
                </NavLink>
              </nav>
            </header>
          </section>
          <section id="leaguessection">
            <Outlet />
          </section>
        </>
      )}
    </>
  );
}

export default AdminLayout;
