import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Context from './Context'
import config from '../../config/config'

const Provider = ({ children }) => {
  const [isOnline, setOnline] = useState(navigator.onLine)

  const { useCustomHooks } = config
  const { useEventListener } = useCustomHooks

  useEventListener('online', () => setOnline(true))
  useEventListener('offline', () => setOnline(false))

  return <Context.Provider value={isOnline}>{children}</Context.Provider>
}

Provider.propTypes = {
  children: PropTypes.any,
}

export default Provider
