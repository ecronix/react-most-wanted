import { useContext } from "react";
import Context from "./Context";
export { default as withAddToHomeScreen } from "./with";
export { default } from "./Provider";

export function useAddToHomeScreen() {
  return useContext(Context);
}
