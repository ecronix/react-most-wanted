import { useContext } from "react";
import Context from "./Context";
import Provider from "./Provider";

function useFirebaseCols() {
  return useContext(Context);
}

export {
  useFirebaseCols,
  Provider as FirebaseColsProvider,
  Context as FirebaseColsContext,
};
