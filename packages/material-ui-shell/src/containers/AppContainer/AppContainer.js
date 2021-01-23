import React from 'react'
import MenuProvider from 'material-ui-shell/lib/providers/Menu/Provider'
import ThemeProvider from 'material-ui-shell/lib/providers/Theme/Provider'
import { useConfig } from 'base-shell/lib/providers/Config'

export default function ({ children }) {
  const { appConfig } = useConfig()

  return (
    <React.Fragment>
      <MenuProvider appConfig={appConfig}>
        <ThemeProvider appConfig={appConfig}>
          <div
            style={{
              display: 'flex',
              direction:'rtl'
            }}
          >
            {children}
          </div>
        </ThemeProvider>
      </MenuProvider>
    </React.Fragment>
  )
}
