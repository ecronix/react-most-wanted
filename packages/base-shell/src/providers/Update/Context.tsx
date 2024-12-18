import React from "react";

export interface UpdateContextType {
  /**
   * @description Value indicating if update is available or not
   */
  isUpdateAvailable: boolean;

  /**
   * @description Method for updating window
   * @param registration
   */
  runUpdate: (registration: any) => void;
}

const Context = React.createContext<UpdateContextType | undefined>(undefined);

export default Context;
