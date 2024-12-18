import React from 'react'
import {
  FieldType,
  SortOrientationType,
} from '@ecronix/material-ui-shell/common.type'

export interface FilterContextType {
  /**
   * Opens the filter panel for the specified list.
   *
   * @param {string} name - The name of the list for which the filter panel should be opened.
   */
  openFilter: (name: string) => void

  /**
   * Closes the filter panel for the specified list.
   *
   * @param {string} name - The name of the list for which the filter panel should be closed.
   */
  closeFilter: (name: string) => void

  /**
   * Clears the filter queries for the specified list.
   *
   * @param {string} name - The name of the list whose filters should be cleared.
   */
  clearFilter: (name: string) => void

  /**
   * Sets the search query for the specified list.
   *
   * @param {string} name - The name of the list for which the search query should be set.
   * @param {string} search - The search query string.
   */
  setSearch: (name: string, search: string) => void

  /**
   * Sets the field by which the list should be sorted.
   *
   * @param {string} name - The name of the list for which the sort field should be set.
   * @param {string} sortField - The field to sort by.
   */
  setFilterSortField: (name: string, sortField: string) => void

  /**
   * Sets the sort orientation (ascending or descending) for the specified list.
   *
   * @param {string} name - The name of the list for which the sort orientation should be set.
   * @param {SortOrientationType} sortOrientation - The sort orientation (e.g., 'asc' or 'desc').
   */
  setFilterSortOrientation: (
    name: string,
    sortOrientation: SortOrientationType
  ) => void

  /**
   * Adds a new filter query to the specified list.
   *
   * @param {string} name - The name of the list to which the filter query should be added.
   * @param {any} query - The filter query to be added.
   */
  addFilterQuery: (name: string, query: any) => void

  /**
   * Removes a filter query from the specified list by index.
   *
   * @param {string} name - The name of the list from which the filter query should be removed.
   * @param {number} index - The index of the filter query to be removed.
   */
  removeFilterQuery: (name: string, index: number) => void

  /**
   * Edits an existing filter query for the specified list.
   *
   * @param {string} name - The name of the list for which the filter query should be edited.
   * @param {number} index - The index of the filter query to be edited.
   * @param {any} query - The new filter query.
   */
  editFilterQuery: (name: string, index: number, query: any) => void

  /**
   * Retrieves the filtered and sorted list for the specified list.
   *
   * @param {string} name - The name of the list to retrieve the filtered and sorted data.
   * @param {any} list - The original list to apply filters and sorting to.
   * @param {FieldType[]} fields - The fields that should be considered for filtering and sorting.
   * @returns {any} The filtered and sorted list.
   */
  getList: (name: string, list: any, fields: FieldType[]) => any

  /**
   * Checks whether the filter panel is open for the specified list.
   *
   * @param {string} name - The name of the list to check the filter panel state.
   * @returns {boolean} `true` if the filter panel is open, `false` otherwise.
   */
  isFilterOpen: (name: string) => boolean

  /**
   * Retrieves the filter queries for the specified list.
   *
   * @param {string} name - The name of the list to retrieve the filter queries for.
   * @returns {any[]} An array of filter queries for the specified list.
   */
  getFilterQueries: (name: string) => any[]

  /**
   * Retrieves the current filter state for the specified list.
   *
   * @param {string} name - The name of the list to retrieve the filter state for.
   * @returns {any} The current filter state for the specified list.
   */
  getFilter: (name: string) => any

  /**
   * Retrieves the field object by its name from the list of fields.
   *
   * @param {string} fieldName - The name of the field to retrieve.
   * @param {FieldType[]} fields - The list of fields to search from.
   * @returns {any} The field object corresponding to the provided field name.
   */
  getField: (fieldName: string, fields: FieldType[]) => any
}
export const Context = React.createContext<FilterContextType | undefined>(
  undefined
)

export default Context
