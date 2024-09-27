import React from 'react'
import { FormHelperText } from '@mui/material'
import { useField } from 'react-final-form'
export function ErrorMessage({
  showError,
  meta,
  formHelperTextProps,
  helperText,
}) {
  if (showError) {
    return React.createElement(
      FormHelperText,
      Object.assign({}, formHelperTextProps),
      meta.error || meta.submitError
    )
  } else if (!!helperText) {
    return React.createElement(
      FormHelperText,
      Object.assign({}, formHelperTextProps),
      helperText
    )
  } else {
    return React.createElement(React.Fragment, null)
  }
}
const config = {
  subscription: {
    error: true,
    submitError: true,
    dirtySinceLastSubmit: true,
    touched: true,
    modified: true,
  },
}
export const useFieldForErrors = (name) => useField(name, config)

export const showErrorOnChange = ({
  meta: { submitError, dirtySinceLastSubmit, error, touched, modified },
}) =>
  !!(((submitError && !dirtySinceLastSubmit) || error) && (touched || modified))
export const showErrorOnBlur = ({
  meta: { submitError, dirtySinceLastSubmit, error, touched },
}) => !!(((submitError && !dirtySinceLastSubmit) || error) && touched)
