import React from "react";
export type PathsContextType = {
  watchPath: (
    path: string,
    onChange?: (data: Object | string | number | boolean | null) => void
  ) => void;
  unwatchPath: (path: string) => void;
  getPath: (path: string, defaultValue?: string) => string;
  clearPath: (path: string) => void;
  clearAllPaths: () => void;
  isPathLoading: (path: string) => void;
  hasPathError: (path: string) => void;
  getPathError: (path: string) => void;
};
export const Context = React.createContext<PathsContextType | undefined>(
  undefined
);

export default Context;
