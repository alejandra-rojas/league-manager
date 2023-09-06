import "../../styles/Admin/AdminLayout.scss";
import { useState } from "react";
import { useCookies } from "react-cookie";

function Auth() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLogIn, setIsLogIn] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const viewLogin = (status) => {
    setError(null);
    setIsLogIn(status);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!isLogIn && password !== confirmPassword) {
      setError(
        "Make sure passwords match!. If you continue to have problems contact the system administrator"
      );
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_SERVERURL}/${endpoint}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie("Email", data.email);
      setCookie("AuthToken", data.token);
      window.location.reload();
    }
  };

  return (
    <section id="auth">
      <div className="login-form">
        <div className="title-container">
          <h2 className="">{isLogIn ? "Admin login" : "Admin sign up"}</h2>
        </div>
        <form id="admin-login-form">
          <div className="form-input">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              required
              placeholder="Type your email address"
              onChange={(e) => {
                setEmail(e.target.value);
                setIsFormComplete(e.target.value && password);
              }}
              autoComplete="email"
            />
          </div>
          <div className="form-input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Type your password"
              onChange={(e) => {
                setPassword(e.target.value);
                setIsFormComplete(email && e.target.value);
              }}
              autoComplete="password"
            />
          </div>
          {!isLogIn && (
            <div className="form-input">
              <label htmlFor="confirm-password">Confirm Password:</label>
              <input
                type="password"
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}
          {error && <p className="error">{error}</p>}
          <button
            type="submit"
            disabled={!isFormComplete}
            onClick={(e) => {
              handleSubmit(e, isLogIn ? "login" : "signup");
            }}
          >
            {isLogIn ? "LOGIN" : "Sign up"}
          </button>
        </form>

        <div className="change-auth">
          {isLogIn && (
            <button
              onClick={() => viewLogin(false)}
              aria-label="Switch to Amin Sign Up"
              aria-pressed={!isLogIn}
            >
              Sign Up
            </button>
          )}
          {!isLogIn && (
            <button
              onClick={() => viewLogin(true)}
              aria-label="Switch to Admin Login"
              aria-pressed={isLogIn}
            >
              Admin Login
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default Auth;
