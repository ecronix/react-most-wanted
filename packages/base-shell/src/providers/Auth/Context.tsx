import React from "react";

export interface AuthContextType {
  auth: {
    isAuthenticated: boolean;
    photoURL: string;
    displayName: string;
    email: string;
  };

  /**
   * @description Set auth to provided auth parameter
   * @param auth
   */
  setAuth: (auth: any) => void;

  /**
   * @description Update auth to provided auth parameter
   * @param auth
   */
  updateAuth: (auth: any) => void;
}

const ConfigContext = React.createContext<AuthContextType | undefined>(
  undefined
);

export default ConfigContext;
