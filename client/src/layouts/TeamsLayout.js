import React from "react";
import { Outlet } from "react-router-dom";

function TeamsLayout() {
  return (
    <div>
      <h2>Teams Layout</h2>
      <Outlet />
    </div>
  );
}

export default TeamsLayout;
