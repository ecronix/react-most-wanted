import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth, useConfig } from "@ecronix/base-shell";
import { useLocation } from "react-router-dom";

/**
 * A route component that renders its children for unauthorized users only.
 *
 * If the user is authenticated, they are redirected to the specified path.
 * If unauthenticated, the children components are rendered.
 *
 * @param {object} props - The properties passed to the `UnauthorizedRoute` component.
 * @param {React.ReactNode} props.children - The components to render if the user is not authenticated.
 * @param {string} [props.redirectTo="/"] - The default path to redirect to if the user is authenticated.
 * @param rest - Additional props passed to the component.
 *
 * @returns {JSX.Element} The rendered children for unauthorized users or a `<Navigate>` component for redirection.
 *
 * @example
 * <UnauthorizedRoute redirectTo="/dashboard">
 *   <LoginPage />
 * </UnauthorizedRoute>
 */
export function UnauthorizedRoute({
  children,
  redirectTo = "/",
  ...rest
}: any): JSX.Element {
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
