import React from 'react'
import TextField from '@material-ui/core/TextField'

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
  defaultOperator: '=',
  filter: (operator, value, qv) => {
    if (qv !== '') {
      const queryValue = parseFloat(qv)
      switch (operator) {
        case '=':
          return value === queryValue
        case '>':
          return value > queryValue
        case '<':
          return value < queryValue
        case '!=':
          return value !== queryValue
        case '<=':
          return value <= queryValue
        case '>=':
          return value >= queryValue
        case 'like':
          return value.toString().indexOf(queryValue.toString()) !== -1
        case '!like':
          return value.toString().indexOf(queryValue.toString()) === -1
        default:
          return false
      }
    } else {
      return true
    }
  },
  sort: (orientation, a, b) => {
    return (a - b) * orientation
  },
  render: (value, onChange) => {
    return (
      <TextField
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    )
  },
}

export default field
