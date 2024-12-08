import React from "react";
export type ListsContextType = {
  requestPermission: (p?: { onDismiss: () => void }) => void;
  token: string | null;
};
export const Context = React.createContext<ListsContextType | undefined>(
  undefined
);

export default Context;
