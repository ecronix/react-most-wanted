import PropTypes from 'prop-types'
import React, { useEffect, useReducer } from 'react'
import Context from './Context'
import reducer from './store/reducer'
import {
  addFilterQuery,
  clearFilter,
  closeFilter,
  editFilterQuery,
  openFilter,
  removeFilterQuery,
  setFilterSortField,
  setFilterSortOrientation,
  setSearch,
} from './store/actions'
import { getList, getField } from './store/selectors'

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
    setSearch: (name, search) => dispatch(setSearch(name, search)),

    setFilterSortField: (name, sortField) =>
      dispatch(setFilterSortField(name, sortField)),
    setFilterSortOrientation: (name, sortOrientation) =>
      dispatch(setFilterSortOrientation(name, sortOrientation)),
    addFilterQuery: (name, query) => dispatch(addFilterQuery(name, query)),
    removeFilterQuery: (name, index) =>
      dispatch(removeFilterQuery(name, index)),
    editFilterQuery: (name, index, query) =>
      dispatch(editFilterQuery(name, index, query)),
    getList: (name, list, fields) => getList(state[name], list, fields),
    isFilterOpen: (name) => (state[name] ? !!state[name].isOpen : false),
    getFilterQueries: (name) =>
      state[name] && state[name].queries ? state[name].queries : [],
    getFilter: (name) => (state[name] ? state[name] : {}),
    getField: (fieldName, fields) => getField(fieldName, fields),
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
