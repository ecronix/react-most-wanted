import { useContext } from "react";
import Context from "./Context";
import Provider from "./Provider";

function useFirebaseDocs() {
  return useContext(Context);
}

export {
  useFirebaseDocs,
  Provider as FirebaseDocsProvider,
  Context as FirebaseDocsContext,
};
