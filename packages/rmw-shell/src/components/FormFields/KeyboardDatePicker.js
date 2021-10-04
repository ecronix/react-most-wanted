import React from 'react'
import { DatePicker } from '@mui/lab'
import { Field } from 'react-final-form'
import { showErrorOnChange } from './Util'

export function KeyboardDatePicker(props) {
  const { name, fieldProps, ...rest } = props
  return React.createElement(
    Field,
    Object.assign(
      {
        name: name,
        render: (fieldRenderProps) =>
          React.createElement(
            KeyboardDatePickerWrapper,
            Object.assign({}, fieldRenderProps, rest)
          ),
      },
      fieldProps
    )
  )
}
function KeyboardDatePickerWrapper(props) {
  const {
    input: { name, onChange, value, ...restInput },
    formatValue = (v) => {
      if (v && v.isValid()) {
        return v.format()
      } else {
        return null //v?._i
      }
    },
    meta,
    dateFunsUtils,
    locale,
    showError = showErrorOnChange,
    ...rest
  } = props
  const { error, submitError } = meta
  const isError = showError({ meta })
  const { helperText, ...lessrest } = rest

  return (
    React.createElement(
      DatePicker,
      Object.assign(
        {
          disableToolbar: true,
          fullWidth: true,
          autoOk: true,
          helperText: isError ? error || submitError : helperText,
          error: isError,
          onChange: (v) => {
            onChange(formatValue(v))
          },
          name: name,
          value: value === '' ? null : value,
          inputProps: restInput,
        },
        lessrest
      )
    ),
    locale
  )
}
