import { useContext } from "react";
import Context from "./Context";
import Provider from "./Provider";

function useFirebaseCols() {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error(
      "useFirebaseCols must be used within a FirebaseColsContext"
    );
  }
  return context;
}

export {
  useFirebaseCols,
  Provider as FirebaseColsProvider,
  Context as FirebaseColsContext,
};
