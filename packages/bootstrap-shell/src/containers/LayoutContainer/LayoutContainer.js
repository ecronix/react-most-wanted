import { useConfig } from 'base-shell/lib/providers/Config'
import PWAPrompt from 'react-ios-pwa-prompt'
import React from 'react'
import { SnackbarProvider } from 'notistack'
import { useIntl } from 'react-intl'

export default function ({ children }) {
  const intl = useIntl()
  const { appConfig } = useConfig()
  const { themeID, isDarkMode, isRTL } = useTheme()
  const { theme: themeConfig, pwa, notistack } = appConfig || {}
  const { useiOSPWAPrompt, iOSPWAPromptProps } = pwa || {}
  const { themes = [] } = themeConfig || {}
  const theme = getThemeSource(themeID, themes, isDarkMode, isRTL)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3} {...notistack}>
        <UpdateContainer>
          <QuestionDialogsProvider>
            <FilterProvider>
              <VirtualListsProvider>{children}</VirtualListsProvider>
            </FilterProvider>
          </QuestionDialogsProvider>
        </UpdateContainer>
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
