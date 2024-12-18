import React, { useContext } from "react";
import Context, { ConfigContextType } from "./Context";
import Provider from "./Provider";

/**
 * Custom hook to access the config provider
 *
 * @function
 * @returns {ConfigContextType} The configuration context.
 * @throws {Error} If used outside of an ConfigProvider.
 * @example
 * const { appConfig } = useConfig();
 *
 * @description
 * This hook provides access to the configuration context. It provides json object containing all configuration data
 * and must be used withing ConfigProvider
 *
 * @see {@link ConfigContextType} for the shape of the returned context
 */
function useConfig(): ConfigContextType {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }

  return context;
}

export { useConfig, Context as ConfigContext, Provider as ConfigProvider };
