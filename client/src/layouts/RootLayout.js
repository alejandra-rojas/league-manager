import { NavLink, Outlet } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

function RootLayout() {
  return (
    <div>
      <header className="flex justify-between">
        <h1 className="text-3xl font-bold underline">
          Highbury and Islington Leagues
        </h1>
        <nav className="flex gap-4">
          <NavLink to={"/"} aria-label="Go to home">
            Home
          </NavLink>
          <NavLink to={"about"} aria-label="Go to About page">
            About
          </NavLink>
          <NavLink to={"admin"} aria-label="Go to Admin section">
            Admin
          </NavLink>
        </nav>
      </header>
      <main className="max-w-7xl my-4 mx-auto ">
        <Breadcrumbs />
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
