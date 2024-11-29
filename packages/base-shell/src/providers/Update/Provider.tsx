import React, { useState, useEffect } from 'react'
import Context from './Context'

interface ProviderProps {
  children: React.ReactNode;
  checkInterval: number;
}

const runUpdate = (registration: ServiceWorkerRegistration | undefined) => {
  try {
    if (registration) {
      registration.waiting?.postMessage({ type: 'SKIP_WAITING' })
    }
    if (window.update) {
      window.update && window.update()
    }
  } catch (error) {
    console.log(error)
  }
}

const Provider: React.FC<ProviderProps> = ({ children, checkInterval }) => {
  const [isUpdateAvailable, setUpdateAvailable] = useState<boolean>(false)

  const checkUpdate = () => {
    if (window.update) {
      setUpdateAvailable(true)
    } else {
      setUpdateAvailable(false)
      setTimeout(checkUpdate, checkInterval)
    }
  }

  useEffect(checkUpdate, [checkUpdate])

  return (
    <Context.Provider value={{ isUpdateAvailable, runUpdate }}>
      {children}
    </Context.Provider>
  )
}

export default Provider
