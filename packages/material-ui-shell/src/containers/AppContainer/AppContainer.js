import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import MenuProvider from '../../providers/Menu/Provider'

export default function ({ children }) {
  return (
    <MenuProvider>
      <div
        style={{
          display: 'flex'
        }}
      >
        <CssBaseline />
        {children}
      </div>
    </MenuProvider>
  )
}
