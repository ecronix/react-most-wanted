import React, { useContext } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import getThemeSource from '../../utils/theme'
import ConfigContext from 'base-shell/lib/providers/Config/Context'
import ThemeContext from '../../providers/Theme/Context'

export default function ({ children }) {
  const { appConfig } = useContext(ConfigContext)
  const { themeID, type } = useContext(ThemeContext)
  const { theme: themeConfig } = appConfig || {}
  const { themes = [] } = themeConfig || {}
  const theme = getThemeSource(themeID, themes, type)

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
