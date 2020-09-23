import PropTypes from 'prop-types'
import React, { useEffect, useReducer } from 'react'
import Context from './Context'
import reducer from './store/reducer'
import { setFilterIsOpen, clearFilter } from './store/actions'

function getInitState(persistKey) {
  let persistedValues = {}
  try {
    persistedValues = JSON.parse(localStorage.getItem(persistKey)) || {}
  } catch (error) {
    console.warn(error)
  }
  return persistedValues
}

const Provider = ({ children, persistKey = 'mui_filter' }) => {
  const [state, dispatch] = useReducer(reducer, getInitState(persistKey))
  console.log('state', state)

  useEffect(() => {
    try {
      localStorage.setItem(persistKey, JSON.stringify(state))
    } catch (error) {
      console.warn(error)
    }
  }, [state, persistKey])

  return (
    <Context.Provider
      value={{
        setFilterIsOpen: (name, isOpen) =>
          dispatch(setFilterIsOpen(name, isOpen)),
        openFilter: (name) => dispatch(setFilterIsOpen(name, true)),
        closeFilter: (name) => dispatch(setFilterIsOpen(name, false)),
        clearFilter: (name) => dispatch(clearFilter(name)),
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
