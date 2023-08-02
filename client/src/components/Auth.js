import React, { useState } from "react";

function Auth() {
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

    await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`);
  };

  return (
    <div>
      <div className="my-5 mx-5 py-5 px-5 rounded-2xl border border-gray-200">
        <form>
          <h2 className="text-2xl font-bold">
            {isLogIn ? "League admin login" : "Sign up to have admin status"}
          </h2>
          <input
            type="email"
            placeholder="email"
            className="my-3 mx-0 py-3 px-4 rounded-xl border border-gray-200"
          />
          <input
            type="password"
            placeholder="password"
            className="my-3 mx-0 py-3 px-4 rounded-xl border border-gray-200"
          />
          {!isLogIn && (
            <input
              type="password"
              placeholder="confirm password"
              className="my-3 mx-0 py-3 px-4 rounded-xl border border-gray-200"
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
          {error && <p>{error}</p>}
        </form>
        <div className="inline-flex">
          <button
            className={`${
              !isLogIn ? "bg-gray-200" : "bg-gray-600"
            } hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l `}
            onClick={() => viewLogin(false)}
          >
            Sign Up
          </button>
          <button
            className={`${
              !isLogIn ? "bg-gray-200" : "bg-gray-600"
            } hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l `}
            onClick={() => viewLogin(true)}
          >
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
