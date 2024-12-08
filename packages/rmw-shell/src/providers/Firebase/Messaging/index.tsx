import { useContext } from "react";
import Context from "./Context";
import Provider from "./Provider";

function useFirebaseMessaging() {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error(
      "useFirebaseMessaging must be used within a FirebaseMessagingContext"
    );
  }
  return context;
}

export {
  useFirebaseMessaging,
  Provider as FirebaseMessagingProvider,
  Context as FirebaseMessagingContext,
};
