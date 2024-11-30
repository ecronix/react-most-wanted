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
  ] as OperatorType[],
  defaultOperator: '=',

  filter: (
    rawValue: any,
    q: { operator: Operators; value: number | string }
  ) => {
    const { operator, value: qv } = q

    if (qv !== '') {
      const queryValue = new Date(qv).getTime()
      const value = new Date(rawValue).getTime()
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
  render: (
    { value = '', _isCaseSensitive = false },
    onChange: (data: any) => void
  ) => {
    return (
      <TextField
        type="date"
        value={value}
        onChange={(e) => onChange({ value: e.target.value })}
        InputLabelProps={{
          shrink: true,
        }}
      />
    )
  },
}

export default field
