import React, { useState } from 'react'
import Context from './Context'

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [isOnline, setOnline] = useState<boolean>(navigator.onLine)

  window.addEventListener('online', () => setOnline(true))
  window.addEventListener('offline', () => setOnline(false))

  return <Context.Provider value={isOnline}>{children}</Context.Provider>
}

export default Provider