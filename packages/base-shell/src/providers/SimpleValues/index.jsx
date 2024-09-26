import { useContext } from "react";
import Context from "./Context";
export { default as withSimpleValues } from "./with";
export { default } from "./Provider";

export function useSimpleValues() {
  return useContext(Context);
}
