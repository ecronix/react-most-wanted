import { useContext } from "react";
import Context, { LocaleContextType } from "./Context";
import Provider from "./Provider";

function useLocale(): LocaleContextType {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}

export { useLocale, Context as LocaleContext, Provider as LocaleProvider };
