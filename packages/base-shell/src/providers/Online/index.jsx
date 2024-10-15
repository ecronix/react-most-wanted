import { useContext } from "react";
import Context from "./Context";
import Provider from "./Provider";

function useOnline() {
  return useContext(Context);
}

export { useOnline, Context as OnlineContext, Provider as OnlineProvider };
