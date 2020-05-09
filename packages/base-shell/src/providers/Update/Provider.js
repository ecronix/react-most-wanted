import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import Context from './Context'
import isUpdateAwailable, { handleUpdate } from '../../utils/updates'

const Provider = ({ children, checkInterval }) => {
  const [updateAvailable, setUpdaeAvailable] = useState(false)

  const checkUpdate = () => {
    if (isUpdateAwailable()) {
      setUpdaeAvailable(true)
    } else {
      setUpdaeAvailable(false)
      setTimeout(checkUpdate, checkInterval)
    }
  }

  useEffect(checkUpdate, [checkUpdate])

  return (
    <Context.Provider value={{ updateAvailable, handleUpdate }}>
      {children}
    </Context.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.any,
}

export default Provider
