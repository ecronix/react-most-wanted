import React, { useState } from "react";
import Context from "./Context";

interface A2HPState {
  deferredPrompt: any;
  isAppInstallable: boolean;
  isAppInstalled: boolean;
}

const initialState: A2HPState = {
  deferredPrompt: () => {},
  isAppInstallable: false,
  isAppInstalled: false,
};

const Provider: React.FC = ({ children }) => {
  const [state, setA2HPState] = useState<A2HPState>(initialState);

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    setA2HPState({ deferredPrompt: e, isAppInstallable: true });
  });

  window.addEventListener("appinstalled", () => {
    setA2HPState({ isAppInstalled: true });
  });

  return (
    <Context.Provider value={{ ...state, setA2HPState }}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
