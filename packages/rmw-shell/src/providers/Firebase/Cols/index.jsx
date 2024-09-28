import { useContext } from "react";
import Context from "./Context";
export { default as withCols } from "./with";
export { default } from "./Provider";

export function useFirebaseCols() {
  return useContext(Context);
}
