import React from 'react'
//import { TextField as SourceField } from 'mui-rff'
import { TextField as MuiTextField } from '@mui/material'
import { showErrorOnChange } from './Util'
import { Field } from 'react-final-form'

/*
const identity = (value) => value

const TextField = ({ fieldProps, ...rest }) => {
  return (
    <SourceField
      required
      fieldProps={{ parse: identity, ...fieldProps }}
      {...rest}
    />
  )
}

export { TextField }
export default TextField
*/

export function TextField(props) {
  const { name, type, fieldProps, ...rest } = props

  return (
    <Field
      name={name}
      type={type}
      render={({ input, meta }) => (
        <TextFieldWrapper
          input={input}
          meta={meta}
          name={name}
          type={type}
          {...rest}
        />
      )}
      {...fieldProps}
    />
  )
}

export function TextFieldWrapper(props) {
  const {
    input: { name, value, type, onChange, onBlur, onFocus, ...restInput },
    meta,
    required,
    fullWidth = true,
    helperText,
    showError = showErrorOnChange,
    ...rest
  } = props

  const { error, submitError } = meta
  const isError = showError({ meta })

  return (
    <MuiTextField
      fullWidth={fullWidth}
      helperText={isError ? error || submitError : helperText}
      error={isError}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      name={name}
      value={value}
      type={type}
      required={required}
      inputProps={{ required, ...restInput }}
      {...rest}
    />
  )
}
