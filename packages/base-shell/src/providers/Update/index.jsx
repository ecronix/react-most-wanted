import { useContext } from "react";
import Context from "./Context";
// export { default as withUpdate } from "./with";
export { default } from "./Provider";

export function useUpdate() {
  return useContext(Context);
}
