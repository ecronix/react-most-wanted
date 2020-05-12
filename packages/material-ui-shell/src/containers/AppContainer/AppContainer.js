import React, { useContext } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import MenuProvider from '../../providers/Menu/Provider'
import ThemeProvider from '../../providers/Theme/Provider'
import ConfigContext from 'base-shell/lib/providers/Config/Context'

export default function ({ children }) {
  const { appConfig } = useContext(ConfigContext)

  return (
    <MenuProvider appConfig={appConfig}>
      <ThemeProvider appConfig={appConfig}>
        <div
          style={{
            display: 'flex',
          }}
        >
          <CssBaseline />
          {children}
        </div>
      </ThemeProvider>
    </MenuProvider>
  )
}
