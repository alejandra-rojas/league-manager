import { NavLink, Outlet } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import AccessibleNavigationAnnouncer from "../components/AccessibleNavigationAnnouncer";

function RootLayout() {
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
            <NavLink to={"/"} aria-label="Go to the Home page">
              Home
            </NavLink>
            <NavLink to={"about"} aria-label="Go to About page">
              About
            </NavLink>
            <NavLink to={"admin/leagues"} aria-label="Go to Admin page">
              Admin
            </NavLink>
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
