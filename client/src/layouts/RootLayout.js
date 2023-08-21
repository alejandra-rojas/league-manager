import { NavLink, Outlet } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import AccessibleNavigationAnnouncer from "../components/AccessibleNavigationAnnouncer";
import { useState } from "react";

function RootLayout() {
  const [activeLink, setActiveLink] = useState("/");

  return (
    <>
      <AccessibleNavigationAnnouncer />
      <header id="primary-navigation" className="flex justify-between">
        <a href="#content" className="sr-only">
          Skip to main content
        </a>
        <a href="/" aria-label="Go to the Home page">
          <h1 className="text-3xl font-bold underline">
            Highbury and Islington Leagues
          </h1>
        </a>
        <div>
          <nav
            role="navigation"
            aria-labelledby="primary-navigation"
            className="flex gap-4"
          >
            <h2 id="primary-site-navigation" className="sr-only">
              Home Site Navigation
            </h2>
            <ul className="flex gap-4">
              <li>
                <NavLink
                  to={"/"}
                  aria-label="Go to the Home page"
                  className={({ isActive }) => (isActive ? "bg-green-600" : "")}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"about"}
                  aria-label="Go to About page"
                  className={({ isActive }) => (isActive ? "bg-green-600" : "")}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"admin"}
                  aria-label="Go to Admin page"
                  className={({ isActive }) => (isActive ? "bg-green-600" : "")}
                >
                  Admin
                </NavLink>
              </li>
            </ul>
          </nav>
          <Breadcrumbs />
        </div>
      </header>
      <main id="content" className="max-w-7xl my-4 mx-auto ">
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
