import { useContext } from "react";
import Context from "./Context";
export { default as withLists } from "./with";
export { default } from "./Provider";

export function useFirebaseLists() {
  return useContext(Context);
}
