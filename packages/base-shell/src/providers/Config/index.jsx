import { useContext } from "react";
import Context from "./Context";
import Provider from "./Provider";

function useConfig() {
  return useContext(Context);
}

export { useConfig, Context as ConfigContext, Provider as ConfigProvider };
