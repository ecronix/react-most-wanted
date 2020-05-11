import React, { useContext } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import MenuProvider from '../../providers/Menu/Provider'
import ConfigContext from 'base-shell/lib/providers/Config/Context'

export default function ({ children }) {
  const config = useContext(ConfigContext)
  console.log('config', config)
  return (
    <MenuProvider>
      <div
        style={{
          display: 'flex',
        }}
      >
        <CssBaseline />
        {children}
      </div>
    </MenuProvider>
  )
}
