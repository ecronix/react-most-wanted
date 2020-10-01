export function getField(name, fields) {
  let field = false
  fields.map((f) => {
    if (f.name === name) {
      field = f
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

  if (list == null || list.length < 1 || fields.length < 1) {
    return []
  }

  result = result.filter((row, i) => {
    let result = true

    queries.map((q) => {
      const { field: fieldName, operator = '=', value } = q
      const field = getField(fieldName, fields)

      if (field) {
        result = field.filter(row[fieldName], q)
      }

      return q
    })

    return result
  })

  if (searchValue != null && searchValue !== '') {
    result = result.filter((row) => {
      return (
        JSON.stringify(row)
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
