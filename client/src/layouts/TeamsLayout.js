import React from "react";
import { Outlet } from "react-router-dom";
import { useTitle } from "../App";

function TeamsLayout() {
  useTitle("Teams Admin");
  return (
    <>
      <section>
        <header>
          <h2>Teams Page</h2>
          <p>Manage your teams and access individual team pages</p>
        </header>
        <Outlet />
      </section>
    </>
  );
}

export default TeamsLayout;
