import React, { useState } from 'react'
import Context from './Context'

const Provider = ({ children }) => {
  const [isOnline, setOnline] = useState(navigator.onLine)

  window.addEventListener('online', () => setOnline(true))
  window.addEventListener('offline', () => setOnline(false))

  return <Context.Provider value={isOnline}>{children}</Context.Provider>
}

export default Provider
