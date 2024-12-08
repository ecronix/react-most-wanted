import { CollectionReference, DocumentData } from "firebase/firestore";
import React from "react";

export type FirebaseColsContextType = {
  watchCol: (reference: string, alias: string) => void;
  unwatchCol: (
    reference: CollectionReference<DocumentData, DocumentData>
  ) => void;
  getCol: (path: string) => void;
  clearCol: (reference: string) => void;
  clearAllCols: () => void;
  isColLoading: (path: string) => boolean;
  hasColError: (path: string) => void;
  getColError: (path: string) => void;
};
export const Context = React.createContext<FirebaseColsContextType | undefined>(
  undefined
);

export default Context;
