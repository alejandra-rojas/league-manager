import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <h2>Page not found!</h2>
      <p>
        Go to the <Link to="/">Homepage</Link>.
      </p>
    </>
  );
}

export default NotFound;
