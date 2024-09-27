import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../providers/Auth";
import { useConfig } from "../providers/Config";

export function AuthorizedRoute({ children }) {
  const { appConfig } = useConfig();
  const { auth: authConfig } = appConfig || {};
  const { signInURL = "/signin" } = authConfig || {};
  const { auth } = useAuth();
  const location = useLocation();

  if (auth.isAuthenticated) {
    return children;
  } else {
    return (
      <Navigate
        //to={`${signInURL}?from=${location.pathname}`}
        to={{
          pathname: signInURL,
          search: `from=${location.pathname}`,
          state: { from: location },
        }}
        replace
      />
    );
  }
}
