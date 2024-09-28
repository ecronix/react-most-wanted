import { useContext } from "react";
import Context from "./Context";
export { default as withDocs } from "./with";
export { default } from "./Provider";

export function useFirebaseDocs() {
  return useContext(Context);
}
