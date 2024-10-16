import { useContext } from "react";
import Context from "./Context";
import Provider from "./Provider";

function useFirebasePaths() {
  return useContext(Context);
}

export {
  useFirebasePaths,
  Provider as FirebasePathsProvider,
  Context as FirebasePathsContext,
};
