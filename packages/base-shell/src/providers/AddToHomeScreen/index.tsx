import { useContext } from "react";
import Context from "./Context";
import Provider from "./Provider";

function useAddToHomeScreen() {
  return useContext(Context);
}

export {
  useAddToHomeScreen,
  Context as AddToHomeScreenContext,
  Provider as AddToHomeScreenProvider,
};
