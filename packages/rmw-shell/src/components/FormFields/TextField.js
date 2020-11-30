import React from 'react'
import { TextField as SourceField } from 'mui-rff'

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
