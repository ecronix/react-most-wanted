import { useContext } from "react";
import Context from "./Context";
import Provider from "./Provider";

function useFirebasePaths() {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error(
      "useFirebasePaths must be used within a FirebasePathsContext"
    );
  }
  return context;
}

export {
  useFirebasePaths,
  Provider as FirebasePathsProvider,
  Context as FirebasePathsContext,
};
