import { useContext } from "react";
import Context, { SimpleValuesContextType } from "./Context";
import Provider from "./Provider";
/**
 * Custom hook to access the simple values context.
 *
 * @function
 * @returns {SimpleValuesContextType} The simple values context value.
 * @throws {Error} If used outside of an SimpleValuesProvider.
 * @example
 * const { setValue, getValue, clearAll, clearValue } = useSimpleValues();
 *
 * @description
 * This hook provides access to the simple values context. It must be used inside SimpleValuesProvider.
 * It provides set of methods for manipulating values.
 * It provides following methods
 *  - setValue
 *  - getValue
 *  - clearAll
 *  - clearValue
 *
 * @see {@link SimpleValuesContextType} for the shape of the returned context
 */
function useSimpleValues(): SimpleValuesContextType {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      "useSimpleValues must be used within a SimpleValuesProvider"
    );
  }
  return context;
}

export {
  useSimpleValues,
  Context as SimpleValuesContext,
  Provider as SimpleValuesProvider,
};
