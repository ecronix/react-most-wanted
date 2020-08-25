import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import Context from './Context'

const Provider = ({ persistKey = 'auth', children }) => {
  const persistIsAuthenticated = localStorage.getItem(
    `${persistKey}_isAuthenticated`
  )
  const persistAuth = JSON.parse(localStorage.getItem(`${persistKey}_auth`))
  const [isAuthenticated, setIsAuthenticated] = useState(
    persistIsAuthenticated || false
  )
  const [auth, setAuth] = useState(persistAuth || {})

  useEffect(() => {
    try {
      localStorage.setItem(persistIsAuthenticated, isAuthenticated)
    } catch (error) {
      console.warn(error)
    }
  }, [isAuthenticated, persistIsAuthenticated])

  useEffect(() => {
    try {
      localStorage.setItem(persistAuth, JSON.stringify(auth))
    } catch (error) {
      console.warn(error)
    }
  }, [auth, persistIsAuthenticated])

  return (
    <Context.Provider
      value={{ isAuthenticated, setIsAuthenticated, auth, setAuth }}
    >
      {children}
    </Context.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.any,
}

export default Provider
