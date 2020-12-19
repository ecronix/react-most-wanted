import React, { useState, useCallback } from 'react'
import Context from './Context'
import config from '../../config/config'
const initialState = {
  deferredPrompt: () => { },
  isAppInstallable: false,
  isAppInstalled: false,
}

const Provider = ({ children }) => {
  const { useCustomHooks } = config
  const { useEventListener } = useCustomHooks
  const [state, setA2HPState] = useState(initialState)

  // Event handler utilizing useCallback ...
  // ... so that reference never changes.
  const handlerBeforeInstallPrompt = useCallback(
    (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later.
      setA2HPState({ deferredPrompt: e, isAppInstallable: true })
    },
    [setA2HPState]
  );

  const handlerAppInstalled = useCallback(
    (e) => {
      setA2HPState({ isAppInstalled: true })
    },
    [setA2HPState]
  );

  // Add event listener using our hook
  useEventListener('beforeinstallprompt', handlerBeforeInstallPrompt);
  useEventListener('appinstalled', handlerAppInstalled);

  return (
    <Context.Provider value={{ ...state, setA2HPState }}>
      {children}
    </Context.Provider>
  )
}

export default Provider
