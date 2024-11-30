import React from 'react'
import { TextField } from '@mui/material'
import { SortOrientationType } from '@ecronix/material-ui-shell/providers/common.type'

const field = {
  operators: [
    { value: '=', label: '=' },
    { value: '>', label: '>' },
    { value: '<', label: '<' },
    { value: '!=', label: '!=' },
    { value: '<=', label: '<=' },
    { value: '>=', label: '>=' },
  ],
  defaultOperator: '=',
  filter: (rawValue: any, q: { operator: string; value: string }) => {
    const { operator, value: qv } = q
    if (qv !== '') {
      const queryValue = qv ? parseInt(qv.split(':').join('')) : 0
      const value = rawValue ? parseInt(rawValue.split(':').join('')) : 0

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
        default:
          return false
      }
    } else {
      return true
    }
  },
  sort: (orientation: SortOrientationType, aRaw: string, bRaw: string) => {
    const a = new Date(aRaw).getTime()
    const b = new Date(bRaw).getTime()
    var result = a < b ? -1 : a > b ? 1 : 0
    return result * orientation
  },
  render: ({ value = '', _isCaseSensitive = false }, onChange: any) => {
    return (
      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        type="time"
        value={value}
        onChange={(e) => onChange({ value: e.target.value })}
      />
    )
  },
}

export default field
