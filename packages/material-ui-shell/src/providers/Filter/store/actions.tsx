import { SortOrientationType } from '@ecronix/material-ui-shell/providers/common.type'
import * as types from './types'

export function openFilter(name: string) {
  return {
    type: types.ON_FILTER_IS_OPEN,
    name,
    payload: { isOpen: true },
  }
}

export function closeFilter(name: string) {
  return {
    type: types.ON_FILTER_IS_CLOSE,
    name,
    payload: { isOpen: false },
  }
}

export function clearFilter(name: string) {
  return {
    type: types.ON_CLEAR,
    name,
  }
}

export function setFilterSortField(name: string, sortField: string) {
  return {
    type: types.ON_FILTER_SORT_FIELD_CHANGED,
    name,
    payload: { sortField },
  }
}

export function setFilterSortOrientation(
  name: string,
  sortOrientation: SortOrientationType
) {
  return {
    type: types.ON_FILTER_SORT_FIELD_CHANGED,
    name,
    payload: { sortOrientation },
  }
}

export function addFilterQuery(name: string, query: any) {
  return {
    type: types.ON_ADD_FILTER_QUERY,
    name,
    payload: { ...query },
  }
}

export function setSearch(name: string, search: string) {
  return {
    type: types.ON_SET_SEARCH,
    name,
    payload: search,
  }
}

export function editFilterQuery(name: string, index: number, query: any) {
  return {
    type: types.ON_EDIT_FILTER_QUERY,
    name,
    index,
    payload: { ...query },
  }
}

export function removeFilterQuery(name: string, index: number) {
  return {
    type: types.ON_REMOVE_FILTER_QUERY,
    name,
    index,
  }
}
