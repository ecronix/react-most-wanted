import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

export default function ({ children }) {
  return (
    <React.Fragment>
      <CssBaseline />
      {children}
    </React.Fragment>
  )
}
