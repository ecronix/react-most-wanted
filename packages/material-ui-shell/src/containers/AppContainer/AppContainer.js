import React, { useContext } from 'react'
import MenuProvider from 'material-ui-shell/lib/providers/Menu/Provider'
import ThemeProvider from 'material-ui-shell/lib/providers/Theme/Provider'
import ConfigContext from 'base-shell/lib/providers/Config/Context'

export default function ({ children }) {
  const { appConfig } = useContext(ConfigContext)

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
