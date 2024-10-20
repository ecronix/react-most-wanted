import React, { useContext } from "react";
import Context, { ConfigContextType } from "./Context";
import Provider from "./Provider";

function useConfig(): ConfigContextType {
  const context = useContext(Context);

  if (context === undefined) {
     throw new Error('useConfig must be used within a ConfigProvider');
  }

  return context;
}

export { useConfig, Context as ConfigContext, Provider as ConfigProvider };
