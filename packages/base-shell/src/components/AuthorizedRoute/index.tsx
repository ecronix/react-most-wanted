import { Navigate, useLocation } from "react-router-dom";
import { useAuth, useConfig } from "@ecronix/base-shell";

/**
 * A route component that renders its children for authenticated users only.
 *
 * If the user is authenticated, the children components are rendered.
 * If unauthenticated, the user is redirected to the sign-in page with the
 * current path included as a query parameter for redirection after login.
 *
 * @param {object} props - The properties passed to the `AuthorizedRoute` component.
 * @param {React.ReactNode} props.children - The components to render if the user is authenticated.
 *
 * @returns {JSX.Element} The rendered children for authorized users or a `<Navigate>` component for redirection.
 *
 * @example
 * <AuthorizedRoute>
 *   <Dashboard />
 * </AuthorizedRoute>
 */

export function AuthorizedRoute({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
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
        }}
        state={{ from: location }}
        replace
      />
    );
  }
}
