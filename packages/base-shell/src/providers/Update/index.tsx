import { useContext } from "react";
import Context from "./Context";
import Provider from "./Provider";

function useUpdate() {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useUpdate must be used within a UpdateProvider");
  }
  return context;
}

export { useUpdate, Context as UpdateContext, Provider as UpdateProvider };
