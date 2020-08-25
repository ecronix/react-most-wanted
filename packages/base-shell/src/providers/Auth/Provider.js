import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import Context from './Context'

const Provider = ({ persistKey = 'auth', children }) => {
  const persistAuth = JSON.parse(localStorage.getItem(persistKey))

  const [auth, setAuth] = useState(persistAuth || {})

  useEffect(() => {
    try {
      localStorage.setItem(persistKey, JSON.stringify(auth))
    } catch (error) {
      console.warn(error)
    }
  }, [auth, persistKey])

  return (
    <Context.Provider value={{ auth, setAuth }}>{children}</Context.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.any,
}

export default Provider
