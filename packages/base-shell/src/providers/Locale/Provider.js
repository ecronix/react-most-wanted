import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import Context from './Context'

const Provider = ({
  children,
  defaultLocale = 'en',
  persistKey = 'locale',
}) => {
  const [locale, setLocale] = useState(defaultLocale)

  useEffect(() => {
    const persistLocale = localStorage.getItem(persistKey)
    if (persistLocale) {
      setLocale(persistLocale)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(persistKey, locale)
    } catch (error) {
      console.warn(error)
    }
  }, [locale])

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
