import { useContext } from "react";
import Context from "./Context";
import Provider from "./Provider";

function useSimpleValues() {
  return useContext(Context);
}

export {
  useSimpleValues,
  Context as SimpleValuesContext,
  Provider as SimpleValuesProvider,
};
