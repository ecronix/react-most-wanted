import React from 'react'
import MUICheckbox from '@material-ui/core/Checkbox'

const Checkbox = ({ label, input, meta: { touched, invalid, error }, ...custom }) => (
  <MUICheckbox checked={!!input.value} {...input} {...custom} />
)

export default Checkbox
