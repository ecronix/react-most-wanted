import { SortOrientationType } from '@ecronix/material-ui-shell/common.type'
import * as types from './types'

/**
 * Opens the filter panel for the specified list.
 *
 * @param {string} name - The name of the list for which the filter panel should be opened.
 * @returns The action object with the type `ON_FILTER_IS_OPEN`, the list name, and a payload indicating that the filter is open.
 */
export function openFilter(name: string) {
  return {
    type: types.ON_FILTER_IS_OPEN,
    name,
    payload: { isOpen: true },
  }
}

/**
 * Closes the filter panel for the specified list.
 *
 * @param {string} name - The name of the list for which the filter panel should be closed.
 * @returns The action object with the type `ON_FILTER_IS_CLOSE`, the list name, and a payload indicating that the filter is closed.
 */
export function closeFilter(name: string) {
  return {
    type: types.ON_FILTER_IS_CLOSE,
    name,
    payload: { isOpen: false },
  }
}

/**
 * Clears all filter queries for the specified list.
 *
 * @param {string} name - The name of the list for which the filter queries should be cleared.
 * @returns The action object with the type `ON_CLEAR` and the list name.
 */
export function clearFilter(name: string) {
  return {
    type: types.ON_CLEAR,
    name,
  }
}

/**
 * Sets the sorting field for the specified list.
 *
 * @param {string} name - The name of the list for which the sort field should be set.
 * @param {string} sortField - The field to sort by.
 * @returns  The action object with the type `ON_FILTER_SORT_FIELD_CHANGED`, the list name, and the new sort field.
 */
export function setFilterSortField(name: string, sortField: string) {
  return {
    type: types.ON_FILTER_SORT_FIELD_CHANGED,
    name,
    payload: { sortField },
  }
}

/**
 * Sets the sorting orientation (ascending or descending) for the specified list.
 *
 * @param {string} name - The name of the list for which the sort orientation should be set.
 * @param {SortOrientationType} sortOrientation - The sort orientation (e.g., 'asc' or 'desc').
 * @returns The action object with the type `ON_FILTER_SORT_FIELD_CHANGED`, the list name, and the new sort orientation.
 */
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

/**
 * Adds a new filter query to the specified list.
 *
 * @param {string} name - The name of the list to which the filter query should be added.
 * @param {any} query - The filter query to be added.
 * @returns The action object with the type `ON_ADD_FILTER_QUERY`, the list name, and the new query as payload.
 */
export function addFilterQuery(name: string, query: any) {
  return {
    type: types.ON_ADD_FILTER_QUERY,
    name,
    payload: { ...query },
  }
}

/**
 * Sets the search query for the specified list.
 *
 * @param {string} name - The name of the list for which the search query should be set.
 * @param {string} search - The search query string.
 * @returns The action object with the type `ON_SET_SEARCH`, the list name, and the search query as payload.
 */
export function setSearch(name: string, search: string) {
  return {
    type: types.ON_SET_SEARCH,
    name,
    payload: search,
  }
}

/**
 * Edits an existing filter query for the specified list.
 *
 * @param {string} name - The name of the list for which the filter query should be edited.
 * @param {number} index - The index of the filter query to be edited.
 * @param {any} query - The updated filter query.
 * @returns The action object with the type `ON_EDIT_FILTER_QUERY`, the list name, the index of the query, and the new query.
 */
export function editFilterQuery(name: string, index: number, query: any) {
  return {
    type: types.ON_EDIT_FILTER_QUERY,
    name,
    index,
    payload: { ...query },
  }
}

/**
 * Removes a filter query from the specified list by index.
 *
 * @param {string} name - The name of the list from which the filter query should be removed.
 * @param {number} index - The index of the filter query to be removed.
 * @returns The action object with the type `ON_REMOVE_FILTER_QUERY`, the list name, and the index of the query to be removed.
 */
export function removeFilterQuery(name: string, index: number) {
  return {
    type: types.ON_REMOVE_FILTER_QUERY,
    name,
    index,
  }
}
