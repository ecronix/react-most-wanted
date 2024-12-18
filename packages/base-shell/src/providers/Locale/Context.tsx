import React from "react";

export interface LocaleContextType {
  /**
   * Current locale settings - defaults to 'en'
   * @type {string}
   */
  locale: string;

  /**
   * Method to update locale settings
   * @param {string} locale - New provided locale string
   */
  setLocale: React.Dispatch<React.SetStateAction<string>>;
}

const Context = React.createContext<LocaleContextType | undefined>(undefined);

export default Context;
