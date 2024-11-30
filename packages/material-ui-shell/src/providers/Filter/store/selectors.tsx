import { SortOrientationType } from '@ecronix/material-ui-shell/providers/common.type'
import {
  boolField,
  dateField,
  numberField,
  textField,
  timeField,
} from '../fields/index'

export type FieldType = {
  name: string
  type: 'text' | 'number' | 'bool' | 'time' | 'date'
  sort?: any
  filter?: any
}
export function getField(name: string, fields: FieldType[] = []) {
  let field: FieldType | undefined = fields.find((f) => f.name === name)
  if (!field) {
    throw new Error('Invalid field provided in getField()')
  }

  fields.map((f: FieldType) => {
    const { type = 'text' } = f
    if (f.name === name) {
      let defaultProps = {}
      if (type === 'number') {
        defaultProps = { ...numberField }
      } else if (type === 'text') {
        defaultProps = { ...textField }
      } else if (type === 'bool') {
        defaultProps = { ...boolField }
      } else if (type === 'time') {
        defaultProps = { ...timeField }
      } else if (type === 'date') {
        defaultProps = { ...dateField }
      }
      field = { ...defaultProps, ...f }
    }
    return f
  })

  return field
}

type FilterType = {
  queries?: any
  sortField?: string
  sortOrientation?: SortOrientationType
  search?: any
}
export function getList(
  filter: FilterType = {},
  list = [],
  fields: FieldType[] = []
) {
  let result = [...list]
  const {
    queries = [],
    sortField: sortFieldName,
    sortOrientation = 1,
    search = {},
  } = filter
  const { value: searchValue = '' } = search

  if (list == null || list.length < 1) {
    return []
  }

  if (fields.length > 0) {
    result = result.filter((row) => {
      let show = true

      for (let i = 0; i < queries.length; i++) {
        const q = queries[i]
        const { field: fieldName } = q
        const field = getField(fieldName, fields)

        if (field) {
          show = field.filter(row[fieldName], q)
        }

        if (!show) {
          return show
        }
      }

      return show
    })
  }

  if (searchValue != null && searchValue !== '' && searchValue !== undefined) {
    result = result.filter((row = {}) => {
      return (
        JSON.stringify({ ...row })
          .toUpperCase()
          .indexOf(String(searchValue).toUpperCase()) !== -1
      )
    })
  }

  if (sortFieldName && sortFieldName !== '') {
    const sortField: FieldType | undefined = getField(sortFieldName, fields)

    if (sortField && result !== undefined && sortField.sort !== undefined) {
      result.sort((a, b) =>
        sortField.sort(sortOrientation, a[sortFieldName], b[sortFieldName])
      )
    }
  }

  return result
}
