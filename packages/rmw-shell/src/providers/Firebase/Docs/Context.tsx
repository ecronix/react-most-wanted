import { DocumentData } from "firebase/firestore";
import React from "react";

export type DocsContextType = {
  watchDoc: (reference: string | string[], alias: string) => void;
  unwatchDoc: (reference: string) => void;
  getDoc: (path: string, defaultValue: string | DocumentData) => void;
  clearDoc: (reference: string) => void;
  clearAllDocs: () => void;
  isDocLoading: (path: string) => void;
  hasDocError: (path: string) => void;
  getDocError: (path: string) => void;
};
export const Context = React.createContext<DocsContextType | undefined>(
  undefined
);

export default Context;
