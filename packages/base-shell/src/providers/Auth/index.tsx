import React, { useContext } from "react";
import Context, { AuthContextType } from "./Context";
import Provider from "./Provider";

/**
    * Hook to use the AuthContext
    * @returns {AuthContextType} The AuthContext
*/
function useAuth(): AuthContextType {
  const context = useContext(Context);

  if (context === undefined) {
     throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export { useAuth, Context as AuthContext, Provider as AuthProvider };
