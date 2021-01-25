import React from 'react'
import MenuProvider from 'material-ui-shell/lib/providers/Menu/Provider'
import ThemeProvider from 'material-ui-shell/lib/providers/Theme/Provider'
import { useConfig } from 'base-shell/lib/providers/Config'
import { useTheme, createMuiTheme } from '@material-ui/core/styles'
import { useTheme as useAppTheme } from 'material-ui-shell/lib/providers/Theme'

import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });


export default function ({ children }) {
  const { appConfig } = useConfig()
  const theme = useTheme()
  const { direction } = useAppTheme() !== null ? useAppTheme() : {direction: 'rtl'}


  console.log("HELLO: in appContainer direction:",direction)

// console.log("in App container, direction is", theme.direction)
  return (
    <React.Fragment>
      <StylesProvider jss={jss}>
      <MenuProvider appConfig={appConfig}>
        <ThemeProvider appConfig={appConfig}>
          <div
            style={{
              display: 'flex',
              // direction: 'rtl'
            }}
          >
            {children}
          </div>
        </ThemeProvider>
      </MenuProvider>
    </StylesProvider>
    </React.Fragment>

  )
}
