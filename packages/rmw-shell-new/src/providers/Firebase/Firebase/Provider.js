import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Context from './Context'

const Provider = ({ firebaseApp, children }) => {
  return (
    <Context.Provider
      value={{
        firebaseApp,
      }}
    >
      {children}
    </Context.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.any,
  firebaseApp: PropTypes.any,
}

export default Provider
