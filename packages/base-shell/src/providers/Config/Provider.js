import PropTypes from 'prop-types'
import React from 'react'
import Context from './Context'

const Provider = ({ appConfig, children }) => {
  return <Context.Provider value={{ appConfig }}>{children}</Context.Provider>
}

Provider.propTypes = {
  children: PropTypes.any,
  appConfig: PropTypes.object.isRequired,
}

export default Provider
