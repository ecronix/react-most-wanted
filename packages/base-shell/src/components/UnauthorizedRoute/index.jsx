import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth, useConfig } from "@ecronix/base-shell/providers";
import { useLocation } from "react-router-dom";

export default function UnauthorizedRoute({
  children,
  redirectTo = "/",
  ...rest
}) {
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
