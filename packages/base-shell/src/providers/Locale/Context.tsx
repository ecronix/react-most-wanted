import React from "react";

export interface LocaleContextType {
  locale: string;
  setLocale: React.Dispatch<React.SetStateAction<string>>;
}

const Context = React.createContext<LocaleContextType | undefined>(undefined);

export default Context;
