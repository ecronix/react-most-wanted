import { useContext } from "react";
import Context, { AddToHomeScreenContextType } from "./Context";
import Provider from "./Provider";

/**
 * Custom hook for addToHomeScreenContext
 *
 * @function
 * @returns {AddToHomeScreenContext} The locale context value.
 * @throws {Error} If used outside of AddToHomeScreenProvider
 * @example
 * const a2HSContext = useAddToHomeScreen();
 *
 * @description
 * This hook provides access to AddToHomeScreenContext.
 *
 * @see {@link AddToHomeScreenContextType} for the shape of the returned context
 */
function useAddToHomeScreen(): AddToHomeScreenContextType {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      "useAddToHomeScreen must be used within a AddToHomeScreenProvider"
    );
  }
  return context;
}

export {
  useAddToHomeScreen,
  Context as AddToHomeScreenContext,
  Provider as AddToHomeScreenProvider,
};
