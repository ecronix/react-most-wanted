import React from 'react'
import { TextField } from '@mui/material'

const field = {
  operators: [
    { value: '=', label: '=' },
    { value: '>', label: '>' },
    { value: '<', label: '<' },
    { value: '!=', label: '!=' },
    { value: '<=', label: '<=' },
    { value: '>=', label: '>=' },
    { value: 'like', label: 'like' },
    { value: '!like', label: '!like' },
  ],
  defaultOperator: '=',
  filter: (value, q) => {
    const { operator, value: qv } = q
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
  render: ({ value = '' }, onChange) => {
    return (
      <TextField
        variant="outlined"
        style={{ padding: 1 }}
        type="number"
        value={value}
        fullWidth
        onChange={(e) => onChange({ value: e.target.value })}
      />
    )
  },
}

export default field
