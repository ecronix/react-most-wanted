import React from 'react'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { FormatSize } from '@mui/icons-material'

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
  defaultOperator: 'like',
  filter: (rawValue = '', q) => {
    const { operator, value: qv, isCaseSensitive = false } = q

    if (qv !== '') {
      let queryValue = qv
      let value = rawValue

      if (isCaseSensitive) {
        queryValue = qv != null ? qv.toUpperCase() : qv
        value = value != null ? value.toUpperCase() : qv
      }
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
    } else {
      return true
    }
  },
  sort: (orientation, a, b) => {
    var result = a < b ? -1 : a > b ? 1 : 0
    return result * orientation
  },
  render: ({ value = '', isCaseSensitive = false }, onChange) => {
    return (
      <TextField
        variant="outlined"
        style={{ padding: 1 }}
        type="text"
        value={value}
        fullWidth
        onChange={(e) => onChange({ value: e.target.value })}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                color={isCaseSensitive ? 'secondary' : 'primary'}
                onClick={() => onChange({ isCaseSensitive: !isCaseSensitive })}
              >
                <FormatSize />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    )
  },
}

export default field
