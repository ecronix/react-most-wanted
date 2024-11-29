import { Navigate, useLocation } from "react-router-dom";
import { useAuth, useConfig } from "@ecronix/base-shell";

/**
 * @description
 * A component that ensures only authenticated user can access page wrapped by this component
 *
 * @param {React.ReactNode} children - The content to render if the user is authenticated.
 * @returns {React.ReactNode} The rendered children or a redirect to the sign-in page.
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
