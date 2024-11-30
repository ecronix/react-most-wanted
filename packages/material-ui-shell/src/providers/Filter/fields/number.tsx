import React from 'react'
import { TextField } from '@mui/material'
import {
  Operators,
  OperatorType,
  SortOrientationType,
} from '@ecronix/material-ui-shell/common.type'

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
  ] as OperatorType[],
  defaultOperator: '=',
  filter: (
    value: number,
    q: { operator: Operators; value: number | string }
  ) => {
    const { operator, value: qv } = q
    if (qv !== '') {
      const queryValue = typeof qv === 'string' ? parseFloat(qv) : qv
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
  sort: (orientation: SortOrientationType, a: number, b: number) => {
    return (a - b) * orientation
  },
  render: ({ value = '' }, onChange: (data: any) => void) => {
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
