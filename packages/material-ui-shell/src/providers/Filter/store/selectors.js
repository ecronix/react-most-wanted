import moment from 'moment'

export const STRING_TYPE = 'string'
export const NUMBER_TYPE = 'number'
export const DATE_TYPE = 'date'
export const TIME_TYPE = 'time'
export const ARRAY_TYPE = 'array'
export const SELECT_FIELD_TYPE = 'select_field'

function getValue(
  source,
  fieldName,
  getSourceValue = fieldValue => fieldValue,
  isCaseSensitive,
  type
) {
  if (source != null && getSourceValue(source)) {
    let fieldValue = getSourceValue(source)[fieldName]

    if (type === 'object') {
      return fieldValue ? fieldValue : {}
    }

    if (type === 'number') {
      return fieldValue ? parseFloat(fieldValue) : 0
    }

    if (typeof fieldValue === 'object' || fieldValue instanceof Object) {
      if (fieldValue.hasOwnProperty('label')) {
        fieldValue = fieldValue.label
      }
    }

    if (type === 'date') {
      return new Date(fieldValue).setHours(0, 0, 0, 0)
    } else if (type === 'bool') {
      return fieldValue === undefined ? 'false' : fieldValue
    } else {
      return isCaseSensitive === true
        ? String(fieldValue)
        : String(fieldValue).toUpperCase()
    }
  }
}

export function dynamicSort(sortField, sortOrientation, getSourceValue) {
  var sortOrder = sortOrientation ? 1 : -1

  return (x, y) => {
    var a = getValue(x, sortField, getSourceValue)
    var b = getValue(y, sortField, getSourceValue)
    var result = a < b ? -1 : a > b ? 1 : 0
    return result * sortOrder
  }
}

export function selectFilterProps(filterName, filters) {
  let isOpen = false
  let hasFilters = false
  let sortField = null
  let sortOrientation = true
  let queries = []
  let searchValue = null

  if (filters !== undefined && filters[filterName] !== undefined) {
    const filter = filters[filterName]

    isOpen = filter.isOpen !== undefined ? filter.isOpen : isOpen
    hasFilters =
      filter.queries !== undefined ? filter.queries.length : hasFilters
    sortField = filter.sortField !== undefined ? filter.sortField : sortField
    sortOrientation =
      filter.sortOrientation !== undefined
        ? filter.sortOrientation
        : sortOrientation
    queries = filter.queries !== undefined ? filter.queries : queries
    searchValue =
      filter.search !== undefined ? filter.search.value : searchValue
  }

  return {
    isOpen,
    hasFilters,
    sortField,
    sortOrientation,
    queries,
    searchValue,
  }
}

export function selectQueryProps(query) {
  let value = ''
  let operator
  let field
  let type = 'string'
  let isCaseSensitive = false
  let isSet = false

  if (query !== undefined) {
    value = query.value !== undefined ? query.value : value
    operator = query.operator !== undefined ? query.operator : operator
    field = query.field !== undefined ? query.field : field
    type = query.type !== undefined ? query.type : type
    isCaseSensitive =
      query.isCaseSensitive !== undefined
        ? query.isCaseSensitive
        : isCaseSensitive
    isSet =
      field !== undefined &&
      field !== null &&
      operator !== undefined &&
      operator !== null &&
      value !== undefined
  }

  return {
    value,
    operator,
    field,
    type,
    isCaseSensitive,
    isSet,
  }
}

export function getFilteredList(filterName, filters, list, getSourceValue) {
  const {
    sortField,
    sortOrientation,
    queries,
    searchValue,
  } = selectFilterProps(filterName, filters)
  const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }

  if (list == null || list.length < 1) {
    return []
  }

  let result = [...list]

  result = result.filter((row, i) => {
    let show = true

    if (queries) {
      for (let query of queries) {
        const {
          value,
          operator,
          field,
          isCaseSensitive,
          isSet,
          type,
        } = selectQueryProps(query)

        if (isSet) {
          let fieldValue = getValue(
            row,
            field.value,
            getSourceValue,
            isCaseSensitive,
            type
          )

          if (type === 'date') {
            const queryDate = moment(value)

            switch (operator.value) {
              case '=':
                show = queryDate.isSame(fieldValue, 'day')
                break

              case '!=':
                show = !queryDate.isSame(fieldValue, 'day')
                break

              case '>':
                show = queryDate.isBefore(fieldValue, 'day')
                break

              case '>=':
                show = queryDate.isSameOrBefore(fieldValue, 'day')
                break

              case '<':
                show = queryDate.isAfter(fieldValue, 'day')
                break

              case '<=':
                show = queryDate.isSameOrAfter(fieldValue, 'day')
                break

              default:
                break
            }

            if (!show) {
              return show
            }
          } else if (type === 'number') {
            const queryNumber = parseFloat(value)

            switch (operator.value) {
              case '=':
                show = fieldValue === queryNumber
                break

              case '!=':
                show = fieldValue !== queryNumber
                break

              case '>':
                show = fieldValue > queryNumber
                break

              case '>=':
                show = fieldValue >= queryNumber
                break

              case '<':
                show = fieldValue < queryNumber
                break

              case '<=':
                show = fieldValue <= queryNumber
                break

              default:
                break
            }

            if (!show) {
              return show
            }
          } else if (type === 'bool') {
            let fieldVal = false
            if (fieldValue === true || fieldValue === 'true') {
              fieldVal = true
            }

            let queryVal = false
            if (value === true || value === 'true') {
              queryVal = true
            }

            show = fieldVal === queryVal

            if (!show) {
              return show
            }
          } else if (type === 'object') {
            show =
              JSON.stringify(fieldValue ? fieldValue : '')
                .toUpperCase()
                .indexOf(String(value ? value : '').toUpperCase()) !== -1

            if (!show) {
              return show
            }
          } else {
            const valueString = String(value)
            const fieldValueString = String(fieldValue)
            let queryValueString =
              isCaseSensitive === true ? valueString : valueString.toUpperCase()

            switch (operator.value) {
              case 'like':
                show = fieldValueString.indexOf(queryValueString) !== -1
                break

              case 'notlike':
                show = fieldValueString.indexOf(queryValueString) === -1
                break

              case '=':
                show = fieldValueString === queryValueString
                break

              case '>':
                show = fieldValueString.localeCompare(queryValueString) > 0
                break

              case '>=':
                show = fieldValueString.localeCompare(queryValueString) >= 0
                break

              case '<':
                show = fieldValueString.localeCompare(queryValueString) < 0
                break

              case '<=':
                show = fieldValueString.localeCompare(valueString) <= 0
                break

              default:
                break
            }

            if (!show) {
              return show
            }
          }
        }
      }
    }

    if (searchValue != null && searchValue !== '' && show) {
      show =
        JSON.stringify(row)
          .toUpperCase()
          .indexOf(String(searchValue).toUpperCase()) !== -1
    }

    return show
  })

  if (result !== undefined && sortField !== null) {
    result.sort(dynamicSort(sortField.value, sortOrientation, getSourceValue))
  }

  return result
}
