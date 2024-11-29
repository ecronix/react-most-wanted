import React, { useState } from "react";
import Context from "./Context";

const initialState: AddToHomeScreenStateProps = {
  deferredPrompt: undefined,
  isAppInstallable: false,
  isAppInstalled: false,
};

export type AddToHomeScreenStateProps = {
  deferredPrompt?: Event | undefined;
  isAppInstallable?: boolean;
  isAppInstalled?: boolean;
};

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setA2HPState] =
    useState<AddToHomeScreenStateProps>(initialState);

  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    setA2HPState({ deferredPrompt: e, isAppInstallable: true });
  });

  window.addEventListener("appinstalled", (evt) => {
    setA2HPState({ isAppInstalled: true });
  });

  return (
    <Context.Provider value={{ ...state, setA2HPState }}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
