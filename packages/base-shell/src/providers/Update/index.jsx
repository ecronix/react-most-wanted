import { useContext } from "react";
import Context from "./Context";

export function useUpdate() {
  return useContext(Context);
}
