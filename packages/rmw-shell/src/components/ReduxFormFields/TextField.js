import React from 'react'
import MUITextField from '@material-ui/core/TextField'

const TextField = ({ label, input, meta: { touched, invalid, error }, ...custom }) => (
  <MUITextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
)

export default TextField
