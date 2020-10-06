import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import Context from './Context'

const Provider = ({
  children,
  defaultLocale = 'en',
  persistKey = 'locale',
}) => {
  const persistLocale = localStorage.getItem(persistKey)
  const [locale, setLocale] = useState(persistLocale || defaultLocale)

  useEffect(() => {
    try {
      localStorage.setItem(persistKey, locale)
    } catch (error) {
      console.warn(error)
    }
  }, [locale, persistKey])

  return (
    <Context.Provider value={{ locale, setLocale }}>
      {children}
    </Context.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.any,
}

export default Provider
