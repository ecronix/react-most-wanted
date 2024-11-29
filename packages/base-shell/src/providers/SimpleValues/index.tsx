import { useContext } from "react";
import Context, { SimpleValuesContextType } from "./Context";
import Provider from "./Provider";

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
