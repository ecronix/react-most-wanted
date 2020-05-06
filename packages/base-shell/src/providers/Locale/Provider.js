import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Context from './Context'

const Provider = ({ children, locale: defaultLocale = 'en' }) => {
  const [locale, setLocale] = useState(defaultLocale)

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
