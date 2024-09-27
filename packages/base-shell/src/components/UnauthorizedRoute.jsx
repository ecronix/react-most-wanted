import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/Auth";
import { useConfig } from "../providers/Config";
import { useLocation } from "react-router-dom";

export function UnauthorizedRoute({ children, redirectTo = "/", ...rest }) {
  const { appConfig } = useConfig();
  let location = useLocation();
  const { auth: authConfig } = appConfig || {};
  const { redirectTo: _redirectTo = redirectTo } = authConfig || {};
  const { auth } = useAuth();

  let from = new URLSearchParams(location.search).get("from") || _redirectTo;

  if (!auth.isAuthenticated) {
    return children;
  } else {
    return <Navigate to={from} replace />;
  }
}
