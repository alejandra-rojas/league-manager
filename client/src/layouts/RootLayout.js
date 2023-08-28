import "../styles/Root.scss";
import "../styles/Admin/Header.scss";
import { NavLink, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

import Breadcrumbs from "../components/Breadcrumbs";
import AccessibleNavigationAnnouncer from "../components/AccessibleNavigationAnnouncer";
import AuthHeader from "../components/Admin/AuthHeader";

function RootLayout() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;

  return (
    <>
      <AccessibleNavigationAnnouncer />
      <header id="header-primary">
        <a href="#content" className="sr-only">
          Skip to main content
        </a>
        {/* <div className="top-banner-admin">
          {!authToken && (
            <NavLink
              to={"admin"}
              aria-label="Go to Admin page"
              className={({ isActive }) => (isActive ? "" : "")}
            >
              Admin
            </NavLink>
          )}
        </div> */}
        {authToken && (
          <div className="top-banner-admin">
            <AuthHeader />
          </div>
        )}
        <div id="primary-navigation">
          <a href="/" aria-label="Go to the Home page">
            <h1>Tennis Leagues Mgmt </h1>
          </a>
          <div>
            <nav role="navigation" aria-labelledby="primary-navigation">
              <h2 id="primary-site-navigation" className="sr-only">
                Home Site Navigation
              </h2>
              <ul>
                <li>
                  <NavLink
                    to={"/"}
                    aria-label="Go to the Home page"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"about"}
                    aria-label="Go to About page"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"admin"}
                    aria-label="Go to Admin page"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Admin
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      {/* <Breadcrumbs /> */}
      <main id="content">
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
