import { useContext } from "react";
import Context from "./Context.js";
import Provider from "./Provider.jsx";

function useFirebaseStorage() {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error(
      "useFirebaseStorage must be used within a FirebaseStorageContext"
    );
  }
  return context;
}

export {
  useFirebaseStorage,
  Provider as FirebaseStorageProvider,
  Context as FirebaseStorageContext,
};
