import { useConfig } from '@ecronix/base-shell'
import { CssBaseline } from '@mui/material'
import PWAPrompt from 'react-ios-pwa-prompt'
import React from 'react'
import {
  useTheme,
  UpdateContainer,
  QuestionsDialogProvider,
} from '@ecronix/material-ui-shell'
import { getThemeSource } from '../../utils'
import { SnackbarProvider } from 'notistack'
import { ThemeProvider } from '@mui/material/styles'
import { useIntl } from 'react-intl'
import {
  FilterProvider,
  VirtualListsProvider,
  MenuProvider,
  ThemeProvider as AppThemeProvider,
} from '@ecronix/material-ui-shell'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const LayoutContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const intl = useIntl()
  const { appConfig } = useConfig()
  const { themeID, isDarkMode, isRTL } = useTheme()
  const { theme: themeConfig, pwa, notistack } = appConfig || {}
  const { useiOSPWAPrompt, iOSPWAPromptProps } = pwa || {}
  const { themes = [] } = themeConfig || {}
  const theme = getThemeSource(themeID, themes, isDarkMode, isRTL)
  console.log('theme')
  console.log(theme)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3} {...notistack}>
        <UpdateContainer>
          <QuestionsDialogProvider>
            <FilterProvider>
              <VirtualListsProvider>{children}</VirtualListsProvider>
            </FilterProvider>
          </QuestionsDialogProvider>
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

type LCProps = {
  children: React.ReactNode
}

export function LayoutContainer({ children }: LCProps): JSX.Element {
  const { appConfig } = useConfig()

  return (
    <React.Fragment>
      <MenuProvider appConfig={appConfig}>
        <AppThemeProvider appConfig={appConfig}>
          <div
            style={{
              display: 'flex',
            }}
          >
            <LayoutContent>{children}</LayoutContent>
          </div>
        </AppThemeProvider>
      </MenuProvider>
    </React.Fragment>
  )
}
