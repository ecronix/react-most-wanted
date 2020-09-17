import { useConfig } from 'base-shell/lib/providers/Config'
import CssBaseline from '@material-ui/core/CssBaseline'
import PWAPrompt from 'react-ios-pwa-prompt'
import React from 'react'
import { useTheme } from 'material-ui-shell/lib/providers/Theme'
import UpdateContainer from 'material-ui-shell/lib/containers/UpdateContainer/UpdateContainer'
import getThemeSource from 'material-ui-shell/lib/utils/theme'
import { SnackbarProvider } from 'notistack'
import { ThemeProvider } from '@material-ui/core/styles'
import { useIntl } from 'react-intl'

export default function ({ children }) {
  const intl = useIntl()
  const { appConfig } = useConfig()
  const { themeID, type } = useTheme()
  const { theme: themeConfig, pwa, notistack } = appConfig || {}
  const { useiOSPWAPrompt, iOSPWAPromptProps } = pwa || {}
  const { themes = [] } = themeConfig || {}
  const theme = getThemeSource(themeID, themes, type)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3} {...notistack}>
        <UpdateContainer>{children}</UpdateContainer>
      </SnackbarProvider>
      {useiOSPWAPrompt && (
        <PWAPrompt
          //debug={true}
          promptOnVisit={1}
          timesToShow={3}
          copyTitle={intl.formatMessage({
            id: 'ios_prompt_title',
            defaultMessage: 'Add to Home Screen',
          })}
          copyClosePrompt={intl.formatMessage({
            id: 'ios_prompt_close',
            defaultMessage: 'Close',
          })}
          copyBody={intl.formatMessage({
            id: 'ios_prompt_body',
            defaultMessage:
              'This website has app functionality. Add it to your home screen to use it in fullscreen and while offline.',
          })}
          copyShareButtonLabel={intl.formatMessage({
            id: 'ios_prompt_share_button',
            defaultMessage: "1) Press the 'Share' button",
          })}
          copyAddHomeButtonLabel={intl.formatMessage({
            id: 'ios_prompt_add_to_home_button',
            defaultMessage: "2) Press 'Add to Home Screen'",
          })}
          permanentlyHideOnDismiss={false}
          {...iOSPWAPromptProps}
        />
      )}
    </ThemeProvider>
  )
}
