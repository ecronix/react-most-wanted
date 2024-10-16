import { useContext } from "react";
import Context from "./Context";
import Provider from "./Provider";

function useFirebaseMessaging() {
  return useContext(Context);
}

export {
  useFirebaseMessaging,
  Provider as FirebaseMessagingProvider,
  Context as FirebaseMessagingContext,
};
