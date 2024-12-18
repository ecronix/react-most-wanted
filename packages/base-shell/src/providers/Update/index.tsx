import { useContext } from "react";
import Context, { UpdateContextType } from "./Context";
import Provider from "./Provider";

/**
 * Custom hook to access the update context.
 *
 * @function
 * @returns {UpdateContextType} The update context value.
 * @throws {Error} If used outside of an UpdateProvider.
 *
 * @description
 * This hook provides access to the update context. It must be used within UpdateProvider.
 *
 *
 * @see {@link UpdateContextType} for the shape of the returned context
 */
function useUpdate(): UpdateContextType {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useUpdate must be used within a UpdateProvider");
  }
  return context;
}

export { useUpdate, Context as UpdateContext, Provider as UpdateProvider };
