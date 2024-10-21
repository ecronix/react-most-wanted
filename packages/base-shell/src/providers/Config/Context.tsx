import { AppConfig } from "@ecronix/base-shell";
import React from "react";

export interface ConfigContextType {
  appConfig: AppConfig;
}

const ConfigContext = React.createContext<ConfigContextType | undefined>(undefined);

export default ConfigContext;
