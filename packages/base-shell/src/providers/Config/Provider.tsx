import React, { ReactNode } from "react";
import Context from "./Context";
import { AppConfig } from "@ecronix/base-shell";

interface ProviderProps {
  appConfig: AppConfig;
  children: ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ appConfig, children }) => {
  return <Context.Provider value={{ appConfig }}>{children}</Context.Provider>;
};

export default Provider;
