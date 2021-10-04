/*
*SOURCE: https://github.com/lookfirst/mui-rff/blob/master/src/Autocomplete.tsx
This should be removed and the native one used ASAP this issues is fixed: https://github.com/lookfirst/mui-rff/issues/308
*/

import TextField from '@mui/material/TextField'
import { Autocomplete as MuiAutocomplete } from '@mui/material'
import React from 'react'
import { Field } from 'react-final-form'
import { showErrorOnChange } from './Util'

export function Autocomplete(props) {
  const { name, fieldProps, ...rest } = props
  return React.createElement(
    Field,
    Object.assign(
      {
        name: name,
        render: (fieldRenderProps) =>
          React.createElement(
            AutocompleteWrapper,
            Object.assign({}, fieldRenderProps, rest)
          ),
      },
      fieldProps
    )
  )
}
function AutocompleteWrapper(props) {
  const {
    input: { name, onChange, value },
    meta,
    options,
    label,
    required,
    multiple,
    textFieldProps,
    getOptionValue,
    getOptionSelected,
    showError = showErrorOnChange,
    placeholder,
    onChange: onChangeCallback,
    ...rest
  } = props

  function getValue(values) {
    if (!getOptionValue) {
      return values
    }
    // ternary hell...
    return multiple
      ? values
        ? values.map(getOptionValue)
        : null
      : values
      ? getOptionValue(values)
      : null
  }
  const { helperText, ...lessrest } = rest
  const { variant, ...restTextFieldProps } = textFieldProps || {}

  // yuck...
  let defaultValue = null
  if (!getOptionValue) {
    defaultValue = value
  } else if (value) {
    options.forEach((option) => {
      const optionValue = getOptionValue(option)
      if (multiple) {
        if (!defaultValue) {
          defaultValue = []
        }
        value.forEach((v) => {
          if (getOptionSelected(optionValue, v)) {
            defaultValue.push(option)
          }
        })
      } else {
        if (getOptionSelected(optionValue, value)) {
          defaultValue = option
        }
      }
    })
  }

  //defaultValue = getValue(value)

  const onChangeFunc = (event, value, reason, details) => {
    const gotValue = getValue(value)
    onChange(gotValue)
    if (onChangeCallback) {
      onChangeCallback(event, value, reason, details)
    }
  }
  const { error, submitError } = meta
  const isError = showError({ meta })

  return React.createElement(
    MuiAutocomplete,
    Object.assign(
      {
        multiple: multiple,
        onChange: onChangeFunc,
        options: options,
        value: defaultValue,
        renderInput: (params) =>
          React.createElement(
            TextField,
            Object.assign(
              {
                label: label,
                required: required,
                helperText: isError ? error || submitError : helperText,
                error: isError,
                name: name,
                placeholder: placeholder,
                variant: variant,
              },
              params,
              restTextFieldProps,
              { fullWidth: true, value }
            )
          ),
      },
      lessrest
    )
  )
}
