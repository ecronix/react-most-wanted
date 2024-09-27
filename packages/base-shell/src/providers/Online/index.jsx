import { useContext } from "react";
import Context from "./Context";
export { default as withOnline } from "./with";
export { default } from "./Provider";

export function useOnline() {
  return useContext(Context);
}
