import React from "react";
import { AddToHomeScreenStateProps } from "./Provider";
export interface AddToHomeScreenContextType {
  deferredPrompt?: Event | undefined;
  isAppInstallable?: boolean;
  isAppInstalled?: boolean;

  /**
   * @description Updates addToHomeScreenContext with provided data
   * @param {AddToHomeScreenStateProps}
   */
  setA2HPState: React.Dispatch<React.SetStateAction<AddToHomeScreenStateProps>>;
}

const Context = React.createContext<AddToHomeScreenContextType | undefined>(
  undefined
);

export default Context;
