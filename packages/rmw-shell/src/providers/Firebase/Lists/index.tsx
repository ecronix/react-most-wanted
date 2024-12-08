import { useContext } from "react";
import Context from "./Context";
import Provider from "./Provider";

function useFirebaseLists() {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error(
      "useFirebaseLists must be used within a FirebaseListsContext"
    );
  }
  return context;
}

export {
  useFirebaseLists,
  Provider as FirebaseListsProvider,
  Context as FirebaseListsContext,
};
