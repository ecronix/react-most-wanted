import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import MenuProvider from '../../providers/Menu/Provider'

export default function ({ children }) {
  return (
    <MenuProvider>
      <CssBaseline />
      <div
        style={{
          display: 'flex',
          flexGrow: 1,
        }}
      >
        {children}
      </div>
    </MenuProvider>
  )
}
