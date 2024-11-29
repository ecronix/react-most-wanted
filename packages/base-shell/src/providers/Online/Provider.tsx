import React, { useState } from "react";
import Context from "./Context";

export interface OnlineProviderProps {
  children: React.ReactNode;
  defaultLocale?: string;
  persistKey?: string;
}

const Provider: React.FC<OnlineProviderProps> = ({ children }) => {
  const [isOnline, setOnline] = useState(navigator.onLine);

  window.addEventListener("online", () => setOnline(true));
  window.addEventListener("offline", () => setOnline(false));

  return <Context.Provider value={isOnline}>{children}</Context.Provider>;
};

export default Provider;
