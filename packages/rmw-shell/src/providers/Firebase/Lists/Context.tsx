import { DatabaseReference, Query } from "firebase/database";
import React from "react";
export type ListsContextType = {
  watchList: (
    reference: string | DatabaseReference | Query,
    alias?: string
  ) => void;
  unwatchList: (reference: string) => void;
  getList: (path: string) => any[];
  clearList: (reference: string) => void;
  clearAllLists: () => void;
  isListLoading: (path: string) => void;
  hasListError: (path: string) => void;
  getListError: (path: string) => void;
};
export const Context = React.createContext<ListsContextType | undefined>(
  undefined
);

export default Context;
