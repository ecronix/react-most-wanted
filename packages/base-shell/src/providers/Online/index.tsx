import { useContext } from "react";
import Context from "./Context";
import Provider from "./Provider";

function useOnline(): boolean {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useOnline must be used within a OnlineProvider");
  }
  return context;
}

export { useOnline, Context as OnlineContext, Provider as OnlineProvider };
