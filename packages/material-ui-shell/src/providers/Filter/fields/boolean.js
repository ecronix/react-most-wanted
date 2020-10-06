import React from 'react'
import Switch from '@material-ui/core/Switch'

const field = {
  operators: [
    { value: '=', label: '=' },
    { value: '!=', label: '!=' },
  ],
  defaultOperator: '=',
  filter: (value, q) => {
    const { operator, value: qv } = q
    if (qv !== '') {
      const queryValue = !!qv
      switch (operator) {
        case '=':
          return value === queryValue
        case '!=':
          return value !== queryValue
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
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
        }}
      >
        <Switch
          onChange={(e, value) => {
            onChange({ value })
          }}
          value={value}
        />
      </div>
    )
  },
}

export default field
