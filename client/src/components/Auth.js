import React, { useState } from "react";

function Auth() {
  const [error, setError] = useState(null);
  const isLogIn = false;

  return (
    <div>
      <div>
        <form>
          <h2>{isLogIn ? "Please log in" : "Please sign up!"}</h2>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          {!isLogIn && <input type="password" placeholder="confirm password" />}
          <input type="submit" />
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Auth;
