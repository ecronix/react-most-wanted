import * as types from './types'

export function openFilter(name) {
  return {
    type: types.ON_FILTER_IS_OPEN,
    name,
    payload: { isOpen: true },
  }
}

export function closeFilter(name) {
  return {
    type: types.ON_FILTER_IS_CLOSE,
    name,
    payload: { isOpen: false },
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

export function setScrollOffset(name, scrollOffset) {
  return {
    type: types.ON_SET_SCROLL_OFFSET,
    name,
    payload: { scrollOffset },
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
