import { useContext } from "react";
import Context from "./Context.js";
import Provider from "./Provider.jsx";

function useFirebaseDocs() {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error(
      "useFirebaseDocs must be used within a FirebaseDocsContext"
    );
  }
  return context;
}

export {
  useFirebaseDocs,
  Provider as FirebaseDocsProvider,
  Context as FirebaseDocsContext,
};
