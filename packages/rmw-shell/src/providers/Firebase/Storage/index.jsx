import { useContext } from "react";
import Context from "./Context";
import Provider from "./Provider";

function useFirebaseStorage() {
  return useContext(Context);
}

export {
  useFirebaseStorage,
  Provider as FirebaseStorageProvider,
  Context as FirebaseStorageContext,
};
