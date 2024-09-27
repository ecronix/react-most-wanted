import { useContext } from "react";
import Context from "./Context";
export { default as withAuth } from "./with";
export { default } from "./Provider";

export function useAuth() {
  return useContext(Context);
}
