import {
  numberField,
  textField,
  boolField,
  dateField,
  timeField,
} from 'material-ui-shell/lib/providers/Filter/fields'

export function getField(name, fields = []) {
  let field = false
  fields.map((f) => {
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

export function getList(filter = {}, list = [], fields = []) {
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
    const sortField = getField(sortFieldName, fields)

    if (result !== undefined && sortField.sort !== undefined) {
      result.sort((a, b) =>
        sortField.sort(sortOrientation, a[sortFieldName], b[sortFieldName])
      )
    }
  }

  return result
}
