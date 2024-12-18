import { useContext } from "react";
import Context, { LocaleContextType } from "./Context";
import Provider from "./Provider";

/**
 * Custom hook for accessing locale context
 *
 * @function
 * @returns {LocaleContextType} The locale context value.
 * @throws {Error} If used outside of LocaleContext
 * @example
 * const { setLocale, locale = "en" } = useLocale();
 *
 * @description
 * This hook provides access localization context. It provides locale value and method to update locale value.
 *
 * @see {@link LocaleProvider} for providing localization context
 * @see {@link LocaleContextType} for the shape of the returned context
 */
function useLocale(): LocaleContextType {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}

export { useLocale, Context as LocaleContext, Provider as LocaleProvider };
