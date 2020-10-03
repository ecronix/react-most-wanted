import React from 'react'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import FormatSize from '@material-ui/icons/FormatSize'
import Title from '@material-ui/icons/Title'

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
  filter: (rawValue, q) => {
    const { operator, value: qv } = q
    if (qv !== '') {
      const queryValue = new Date(qv).getTime()
      const value = new Date(rawValue).getTime()

      console.log('times', { qv, rawValue })
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
  sort: (orientation, aRaw, bRaw) => {
    const a = new Date(aRaw).getTime()
    const b = new Date(bRaw).getTime()
    var result = a < b ? -1 : a > b ? 1 : 0
    return result * orientation
  },
  render: ({ value = '', isCaseSensitive = false }, onChange) => {
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
