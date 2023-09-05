import "../styles/Admin/AdminLayout.scss";
import { NavLink, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import Auth from "../components/Admin/Auth";
import AuthHeader from "../components/Admin/AuthHeader";
import { useTitle } from "../App";

function AdminLayout() {
  useTitle("Admin Section");
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  console.log(authToken);

  return (
    <>
      {!authToken && <Auth />}
      {authToken && (
        <>
          {/* <section id="admin-primary-navigation">
            <header>
              <a href="#leaguessection" className="sr-only">
                Skip to leagues section navigation
              </a>
              <nav aria-labelledby="admin-primary-navigation-label">
                <h2 id="admin-primary-navigation-label" className="sr-only">
                  Primary Admin Navigation
                </h2>
                <ul className="flex gap-4">
                  <li>
                    <NavLink
                      to={"leagues"}
                      aria-label="Go to leagues section"
                      className={({ isActive }) =>
                        isActive ? "bg-green-600" : ""
                      }
                    >
                      Leagues
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"players"}
                      aria-label="Go to players section"
                      className={({ isActive }) =>
                        isActive ? "bg-green-600" : ""
                      }
                    >
                      Players
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"teams"}
                      aria-label="Go to teams section"
                      className={({ isActive }) =>
                        isActive ? "bg-green-600" : ""
                      }
                    >
                      Teams
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </header>
          </section> */}

          <Outlet />
        </>
      )}
    </>
  );
}

export default AdminLayout;
