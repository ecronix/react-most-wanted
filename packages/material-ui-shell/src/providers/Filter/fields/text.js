const field = {
  operators: [
    { value: '=', label: '=' },
    { value: '>', label: '>' },
    { value: '<', label: '<' },
    { value: '!=', label: '!=' },
    { value: '>=', label: '<=' },
    { value: '>=', label: '>=' },
    { value: 'like', label: 'like' },
    { value: '!like', label: '!like' },
  ],
  defaultOperator: 'like',
  filter: (operator, value, queryValue) => {
    switch (operator) {
      case '=':
        return value === queryValue
      case '>':
        return value.localeCompare(queryValue) > 0
      case '<':
        return value.localeCompare(queryValue) < 0
      case '!=':
        return value !== queryValue
      case '<=':
        return value.localeCompare(queryValue) <= 0
      case '>=':
        return value.localeCompare(queryValue) >= 0
      case 'like':
        return value.indexOf(queryValue) !== -1
      case '!like':
        return value.indexOf(queryValue) === -1
      default:
        return false
    }
  },
  sort: (orientation, a, b) => {
    var result = a < b ? -1 : a > b ? 1 : 0
    return result * orientation
  },
}

export default field
