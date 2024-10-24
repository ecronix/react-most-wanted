import { Navigate, useLocation } from "react-router-dom";
import { AppConfig, useAuth, useConfig } from "@ecronix/base-shell";

export function AuthorizedRoute({ children }: { children: React.ReactNode }) {
  const { appConfig } = useConfig()
  const { auth: authConfig } = appConfig || {};
  const { signInURL = "/signin" } = authConfig || {};
  const { auth } = useAuth()
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
