import React from 'react'
import MenuProvider from 'material-ui-shell/lib/providers/Menu/Provider'
import ThemeProvider from 'material-ui-shell/lib/providers/Theme/Provider'
import { useConfig } from 'base-shell/lib/providers/Config'
// import { useTheme as useAppTheme } from 'material-ui-shell/lib/providers/Theme'
import { useTheme } from '@material-ui/core/styles'

export default function ({ children }) {
  const { appConfig } = useConfig()
  // const { direction } = useAppTheme()
  const theme = useTheme()
  // const { direction } = themeContext


console.log("in App container, direction is", theme.direction)
  return (
    <React.Fragment>
      <MenuProvider appConfig={appConfig}>
        <ThemeProvider appConfig={appConfig}>
          <div
            style={{
              display: 'flex',
              direction: 'rtl'
            }}
          >
            {children}
          </div>
        </ThemeProvider>
      </MenuProvider>
    </React.Fragment>
  )
}
