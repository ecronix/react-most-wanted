import { useContext } from "react";
import Context from "./Context";
import Provider from "./Provider";

function useAuth() {
  return useContext(Context);
}

export { useAuth, Context as AuthContext, Provider as AuthProvider };
