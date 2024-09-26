import React from 'react'
import Context from './Context'

const Provider = ({ appConfig, children }) => {
  return <Context.Provider value={{ appConfig }}>{children}</Context.Provider>
}

export default Provider
