import React, { useContext } from "react";
import Context, { AuthContextType } from "./Context";
import Provider from "./Provider";
/**
 * Custom hook to access the authentication context.
 *
 * @function
 * @returns {AuthContextType} The authentication context value.
 * @throws {Error} If used outside of an AuthProvider.
 * @example
 * const auth = useAuth();
 * console.log(auth.isAuthenticated);
 *
 * @description
 * This hook provides access to the authentication context, which includes
 * information about the current user's authentication state and related
 * functions. It must be used within a component that is wrapped by an
 * AuthProvider.
 *
 * The AuthContextType typically includes properties such as:
 * - isAuthenticated: A boolean indicating if the user is authenticated
 * - user: The current user object (if authenticated)
 * - login: A function to log in the user
 * - logout: A function to log out the user
 *
 * @see {@link AuthProvider} for providing the authentication context
 * @see {@link AuthContextType} for the shape of the returned context
 */
function useAuth(): AuthContextType {
  const context = useContext(Context);

  if (context === undefined) {
     throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export { useAuth, Context as AuthContext, Provider as AuthProvider };
