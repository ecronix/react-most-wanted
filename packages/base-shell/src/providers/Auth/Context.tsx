import React from "react";

export type ProviderData = { providerId: string };
export type AuthUser = {
  isAuthenticated: boolean;
  photoURL: string;
  displayName: string;
  email: string;
  uid: string;
  isAdmin?: boolean;
  providerData?: ProviderData[];
  notificationsDisabled?: boolean;
  grants?: string[];
};

// TODO Fix isAuthGranted import everywhere
export interface IAuthContext {
  auth: AuthUser;

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

  isAuthGranted?: (auth: AuthUser, type: string) => boolean;
}

const ConfigContext = React.createContext<IAuthContext | undefined>(undefined);

export default ConfigContext;
