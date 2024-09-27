import { useContext } from "react";
import Context from "./Context";
export { default as withStorage } from "./with";
export { default } from "./Provider";

export function useStorage() {
  return useContext(Context);
}
