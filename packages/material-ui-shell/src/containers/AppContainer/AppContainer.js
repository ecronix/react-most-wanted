import React from 'react'
import MenuProvider from 'material-ui-shell/lib/providers/Menu/Provider'
import ThemeProvider from 'material-ui-shell/lib/providers/Theme/Provider'
import { useConfig } from 'base-shell/lib/providers/Config'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

export default function ({ children }) {
  const { appConfig } = useConfig()

  return (
    <React.Fragment>
      <MenuProvider appConfig={appConfig}>
        <ThemeProvider appConfig={appConfig}>
          <div
            style={{
              display: 'flex',
            }}
          >
            {children}
          </div>
        </ThemeProvider>
      </MenuProvider>
    </React.Fragment>
  )
}
