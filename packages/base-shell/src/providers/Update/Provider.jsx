import React, { useState, useEffect } from 'react'
import Context from './Context'

const runUpdate = (registration) => {
  try {
    if (registration) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }
    if (window.update) {
      window.update && window.update()
    }
  } catch (error) {
    console.log(error)
  }
}

const Provider = ({ children, checkInterval }) => {
  const [isUpdateAvailable, setUpdateAvailable] = useState(false)

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
