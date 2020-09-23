import * as types from './types'

export function setFilterIsOpen(name, isOpen) {
  return {
    type: types.ON_FILTER_OPEN_CHANGED,
    name,
    payload: { isOpen },
  }
}

export function clearFilter(name, isOpen) {
  return {
    type: types.ON_CLEAR,
    name,
  }
}

export function setFilterSortField(name, sortField) {
  return {
    type: types.ON_FILTER_SORT_FIELD_CHANGED,
    name,
    payload: { sortField },
  }
}

export function setFilterSortOrientation(name, sortOrientation) {
  return {
    type: types.ON_FILTER_SORT_FIELD_CHANGED,
    name,
    payload: { sortOrientation },
  }
}

export function addFilterQuery(name, query) {
  return {
    type: types.ON_ADD_FILTER_QUERY,
    name,
    payload: { ...query },
  }
}

export function setSearch(name, search) {
  return {
    type: types.ON_SET_SEARCH,
    name,
    payload: search,
  }
}

export function editFilterQuery(name, index, query) {
  return {
    type: types.ON_EDIT_FILTER_QUERY,
    name,
    index,
    payload: { ...query },
  }
}

export function removeFilterQuery(name, index) {
  return {
    type: types.ON_REMOVE_FILTER_QUERY,
    name,
    index,
  }
}
