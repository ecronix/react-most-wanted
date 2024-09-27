import { useContext } from "react";
import Context from "./Context";
export { default as withLocale } from "./with";
export { default } from "./Provider";

export function useLocale() {
  return useContext(Context);
}
