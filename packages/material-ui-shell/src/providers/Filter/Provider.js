import PropTypes from 'prop-types'
import React, { useEffect, useReducer } from 'react'
import Context from './Context'
import reducer from './store/reducer'
import {
  setFilterIsOpen,
  clearFilter,
  setFields,
  addFilterQuery,
} from './store/actions'
import { getList } from './store/selectors'

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
      let stateToSave = {}

      Object.keys(state).map((k) => {
        const { fields, ...rest } = state[k]
        stateToSave[k] = rest
      })

      localStorage.setItem(persistKey, JSON.stringify(stateToSave))
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
        setFields: (name, fields) => dispatch(setFields(name, fields)),
        addFilterQuery: (name, query) => dispatch(addFilterQuery(name, query)),
        getList: (name, list) => getList(state[name], list),
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
