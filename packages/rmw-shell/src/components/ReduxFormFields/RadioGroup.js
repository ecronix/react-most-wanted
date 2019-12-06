import React from 'react'
import MUIRadioGroup from '@material-ui/core/RadioGroup'

const RadioGroup = ({ label, input, meta: { touched, invalid, error }, ...custom }) => (
  <MUIRadioGroup
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
)

export default RadioGroup
