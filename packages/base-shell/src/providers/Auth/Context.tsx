import React from "react";

export interface AuthContextType {
  auth: {
    isAuthenticated: boolean;
  };
}

const ConfigContext = React.createContext<AuthContextType | undefined>(undefined);

export default ConfigContext;
