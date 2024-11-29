import { useContext } from "react";
import Context from "./Context";
import Provider from "./Provider";

function useUpdate() {
  return useContext(Context);
}

export { useUpdate, Context as UpdateContext, Provider as UpdateProvider };
