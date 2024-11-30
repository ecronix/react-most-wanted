import React from 'react'
import { Switch } from '@mui/material'
import {
  Operators,
  SortOrientationType,
} from '@ecronix/material-ui-shell/providers/common.type'

const field = {
  operators: [
    { value: '=', label: '=' },
    { value: '!=', label: '!=' },
  ],
  defaultOperator: '=',
  filter: (
    value: boolean,
    q: { operator: Operators; value: boolean | string }
  ) => {
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
  sort: (orientation: SortOrientationType, a: number, b: number) => {
    return (a - b) * orientation
  },
  render: (
    { value = '' },
    onChange: ({ value }: { value: boolean }) => void
  ) => {
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
