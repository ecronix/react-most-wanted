import React from "react";

export interface UpdateContextType {
  isUpdateAvailable: boolean;

  /**
   * @description Update window
   * @param registration
   */
  runUpdate: (registration: any) => void;
}

const Context = React.createContext<UpdateContextType | undefined>(undefined);

export default Context;
