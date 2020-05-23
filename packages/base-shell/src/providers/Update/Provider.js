import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import Context from './Context'

const runUpdate = () => {
  window.update && window.update()
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

Provider.propTypes = {
  children: PropTypes.any,
}

export default Provider
