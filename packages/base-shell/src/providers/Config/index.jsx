import { useContext } from "react";
import Context from "./Context";
export { default as withConfig } from "./with";
export { default } from "./Provider";

export function useConfig() {
  return useContext(Context);
}
