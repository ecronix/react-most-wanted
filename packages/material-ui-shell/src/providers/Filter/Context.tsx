import React from 'react'
import {
  FieldType,
  SortOrientationType,
} from '@ecronix/material-ui-shell/common.type'

export interface FilterContextType {
  openFilter: (name: string) => void
  closeFilter: (name: string) => void
  clearFilter: (name: string) => void
  setSearch: (name: string, search: string) => void
  setFilterSortField: (name: string, sortField: string) => void
  setFilterSortOrientation: (
    name: string,
    sortOrientation: SortOrientationType
  ) => void
  addFilterQuery: (name: string, query: any) => void
  removeFilterQuery: (name: string, index: number) => void
  editFilterQuery: (name: string, index: number, query: any) => void
  getList: (name: string, list: any, fields: FieldType[]) => any
  isFilterOpen: (name: string) => boolean
  getFilterQueries: (name: string) => any[]
  getFilter: (name: string) => any
  getField: (fieldName: string, fields: FieldType[]) => any
}

export const Context = React.createContext<FilterContextType | undefined>(
  undefined
)

export default Context
