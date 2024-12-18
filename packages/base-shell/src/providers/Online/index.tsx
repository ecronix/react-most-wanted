import { useContext } from "react";
import Context from "./Context";
import Provider from "./Provider";

/**
 * Custom hook to access the online listener provider.
 *
 * @function
 * @returns {boolean} Boolean value regarding if client is online or offline
 * @throws {Error} If used outside of an OnlineProvider.
 * @example
 * const isOnline = useOnline();
 *
 * @description
 * This hook provides access to the online listener context. It returns true if client is online.
 */
function useOnline(): boolean {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useOnline must be used within a OnlineProvider");
  }
  return context;
}

export { useOnline, Context as OnlineContext, Provider as OnlineProvider };
