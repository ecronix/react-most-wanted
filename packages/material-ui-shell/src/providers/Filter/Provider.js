import PropTypes from 'prop-types'
import React, { useEffect, useReducer } from 'react'
import Context from './Context'
import reducer from './store/reducer'
import {
  openFilter,
  closeFilter,
  clearFilter,
  addFilterQuery,
  removeFilterQuery,
  editFilterQuery,
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
      localStorage.setItem(persistKey, JSON.stringify(state))
    } catch (error) {
      console.warn(error)
    }
  }, [state, persistKey])

  const props = {
    openFilter: (name) => dispatch(openFilter(name)),
    closeFilter: (name) => dispatch(closeFilter(name)),
    clearFilter: (name) => dispatch(clearFilter(name)),
    addFilterQuery: (name, query) => dispatch(addFilterQuery(name, query)),
    removeFilterQuery: (name, index) =>
      dispatch(removeFilterQuery(name, index)),
    editFilterQuery: (name, index, query) =>
      dispatch(editFilterQuery(name, index, query)),
    getList: (name, list, fields) => getList(state[name], list, fields),
    isFilterOpen: (name) => (state[name] ? !!state[name].isOpen : false),
    getFilterQueries: (name) =>
      state[name] && state[name].queries ? state[name].queries : [],
  }

  return (
    <Context.Provider
      value={{
        ...props,
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
