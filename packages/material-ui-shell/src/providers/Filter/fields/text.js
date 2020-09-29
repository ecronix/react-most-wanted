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
    { value: 'like', label: 'like' },
    { value: '!like', label: '!like' },
  ],
  defaultOperator: 'like',
  filter: (operator, value, qv) => {
    if (qv !== '') {
      const queryValue = qv
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
