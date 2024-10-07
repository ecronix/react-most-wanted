import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useIntl } from "react-intl";
import { useAuth } from "@ecronix/base-shell";

export const SignInPage = () => {
  const { setAuth } = useAuth();
  let navigate = useNavigate();
  let location = useLocation();
  const intl = useIntl();
  const [username, setUsername] = useState("");
  const [, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    authenticate({
      displayName: username,
    });
  }

  const authenticate = (user) => {
    setAuth({ isAuthenticated: true, ...user });
    let _route = "/home";
    let from = new URLSearchParams(location.search).get("from");

    if (from) {
      navigate(from, { replace: true });
    } else {
      navigate(_route, { replace: true });
    }
  };

  return (
    <div>
      {intl.formatMessage({ id: "sign_in2" })}
      <form onSubmit={handleSubmit}>
        <label>
          {intl.formatMessage({ id: "username" })}
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          {intl.formatMessage({ id: "password" })}
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input type="submit" value={intl.formatMessage({ id: "sign_in" })} />
      </form>
    </div>
  );
};
