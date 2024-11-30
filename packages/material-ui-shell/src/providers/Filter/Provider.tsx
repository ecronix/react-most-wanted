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
import { getList, getField, FieldType } from './store/selectors'
import { IProviderProps } from '../IProviderProps'

function getInitState(persistKey: string) {
  const pkString = localStorage.getItem(persistKey)
  let persistedValues = {}
  try {
    persistedValues = pkString ? JSON.parse(pkString) : {}
  } catch (error) {
    console.warn(error)
  }
  return persistedValues
}

const Provider: React.FC<IProviderProps> = ({
  children,
  persistKey = 'mui_filter',
}) => {
  const [state, dispatch] = useReducer(reducer, getInitState(persistKey))

  useEffect(() => {
    try {
      localStorage.setItem(persistKey, JSON.stringify(state))
    } catch (error) {
      console.warn(error)
    }
  }, [state, persistKey])

  const props = {
    openFilter: (name: string) => dispatch(openFilter(name)),
    closeFilter: (name: string) => dispatch(closeFilter(name)),
    clearFilter: (name: string) => dispatch(clearFilter(name)),
    setSearch: (name: string, search: string) =>
      dispatch(setSearch(name, search)),

    setFilterSortField: (name: string, sortField: string) =>
      dispatch(setFilterSortField(name, sortField)),
    setFilterSortOrientation: (name: string, sortOrientation: 1 | -1) =>
      dispatch(setFilterSortOrientation(name, sortOrientation)),
    addFilterQuery: (name: string, query: any) =>
      dispatch(addFilterQuery(name, query)),
    removeFilterQuery: (name: string, index: number) =>
      dispatch(removeFilterQuery(name, index)),
    editFilterQuery: (name: string, index: number, query: any) =>
      dispatch(editFilterQuery(name, index, query)),
    getList: (name: string, list: any, fields: FieldType[]) =>
      getList(state[name], list, fields),
    isFilterOpen: (name: string) =>
      state[name] ? !!state[name].isOpen : false,
    getFilterQueries: (name: string) =>
      state[name] && state[name].queries ? state[name].queries : [],
    getFilter: (name: string) => (state[name] ? state[name] : {}),
    getField: (fieldName: string, fields: FieldType[]) =>
      getField(fieldName, fields),
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

export default Provider
