import { useContext } from "react";
import Context from "./Context";
export { default as withPaths } from "./with";
export { default } from "./Provider";

export function usePaths() {
  return useContext(Context);
}
