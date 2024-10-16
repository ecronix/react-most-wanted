import { useContext } from "react";
import Context from "./Context";
import Provider from "./Provider";

function useFirebaseLists() {
  return useContext(Context);
}

export {
  useFirebaseLists,
  Provider as FirebaseListsProvider,
  Context as FirebaseListsContext,
};
