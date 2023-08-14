import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

function Auth() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLogIn, setIsLogIn] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  const viewLogin = (status) => {
    setError(null);
    setIsLogIn(status);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogIn && password !== confirmPassword) {
      setError("Make sure passwords match!");
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
      toast.success(`Succes`);
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="my-5 mx-5 py-5 px-5 rounded-2xl border border-gray-200">
        <form>
          <div className="flex justify-between">
            {isLogIn ? "Admin login" : "Admin sign up"}
          </div>
          <input
            type="email"
            placeholder="email"
            className="my-3 mx-0 py-3 px-4 rounded-xl border border-gray-200"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="my-3 mx-0 py-3 px-4 rounded-xl border border-gray-200"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogIn && (
            <input
              type="password"
              placeholder="confirm password"
              className="my-3 mx-0 py-3 px-4 rounded-xl border border-gray-200"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input
            type="submit"
            className={
              "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
            }
            onClick={(e) => {
              handleSubmit(e, isLogIn ? "login" : "signup");
            }}
          />
          {error && <p className="text-red-500">{error}</p>}
        </form>
        <div className="flex justify-end">
          {isLogIn && (
            <button
              className={` hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-l `}
              onClick={() => viewLogin(false)}
            >
              Sign Up
            </button>
          )}
          {!isLogIn && (
            <button
              className={` hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 `}
              onClick={() => viewLogin(true)}
            >
              Admin Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;
