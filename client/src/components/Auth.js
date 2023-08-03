import React, { useState } from "react";
import { useCookies } from "react-cookie";

function Auth({ setShowLogin }) {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLogIn, setIsLogIn] = useState(true);
  const [adminEmail, setAdminEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const [error, setError] = useState(null);

  const viewLogin = () => {
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminEmail, password }),
    });

    const data = await response.json();

    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie("AdminEmail", data.adminEmail);
      setCookie("AuthToken", data.token);

      window.location.reload();
    }
  };

  return (
    <div>
      <div className="my-5 mx-5 py-5 px-5 rounded-2xl border border-gray-200">
        <form>
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Admin login</h2>
            <h3
              className="border"
              onClick={() => {
                setShowLogin(false);
              }}
            >
              x
            </h3>
          </div>
          <input
            type="email"
            placeholder="email"
            className="my-3 mx-0 py-3 px-4 rounded-xl border border-gray-200"
            onChange={(e) => setAdminEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="my-3 mx-0 py-3 px-4 rounded-xl border border-gray-200"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="submit"
            className={
              "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
            }
            onClick={(e) => {
              handleSubmit(e);
            }}
          />
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Auth;
