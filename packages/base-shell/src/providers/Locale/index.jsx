import { useContext } from "react";
import Context from "./Context";
import Provider from "./Provider";

function useLocale() {
  return useContext(Context);
}

export { useLocale, Context as LocaleContext, Provider as LocaleProvider };
