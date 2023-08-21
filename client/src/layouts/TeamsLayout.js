import React from "react";
import { Outlet } from "react-router-dom";

function TeamsLayout() {
  return (
    <>
      <section>
        <hgroup>
          <h2>Teams Page</h2>
          <p>Manage your teams and access individual team pages</p>
        </hgroup>
        <Outlet />
      </section>
    </>
  );
}

export default TeamsLayout;
