import React, { useContext } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import getThemeSource from 'material-ui-shell/lib/utils/theme'
import ConfigContext from 'base-shell/lib/providers/Config/Context'
import ThemeContext from 'material-ui-shell/lib/providers/Theme/Context'
import CssBaseline from '@material-ui/core/CssBaseline'
import PWAPrompt from 'react-ios-pwa-prompt'
import { useIntl } from 'react-intl'
import UpdateContext from 'base-shell/lib/providers/Update/Context'

export default function ({ children }) {
  const intl = useIntl()
  const { appConfig } = useContext(ConfigContext)
  const { components } = appConfig || {}
  const { UpdateDialog = null } = components || {}
  const { isUpdateAvailable, runUpdate } = useContext(UpdateContext)
  const { themeID, type } = useContext(ThemeContext)
  const { theme: themeConfig, pwa } = appConfig || {}
  const { useiOSPWAPrompt, iOSPWAPromptProps, useUpdateDialog } = pwa || {}
  const { themes = [] } = themeConfig || {}
  const theme = getThemeSource(themeID, themes, type)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
      {useUpdateDialog && (
        <UpdateDialog
          isUpdateAvailable={isUpdateAvailable}
          runUpdate={runUpdate}
        />
      )}
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
