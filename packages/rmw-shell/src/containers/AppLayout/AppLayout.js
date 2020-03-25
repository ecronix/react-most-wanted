import 'react-toastify/dist/ReactToastify.css'
import Drawer from '../../containers/Drawer'
import React, { useEffect } from 'react'
import Routes from '../../containers/Routes'
import { ToastContainer } from 'react-toastify'
import { makeStyles } from '@material-ui/styles'
import withAppConfig from '../../contexts/AppConfigProvider/withAppConfigs'
import Analytics from '../../containers/Analytics/Analytics'
import { injectIntl } from 'react-intl'
import PWAPrompt from 'react-ios-pwa-prompt'

const useStyles = makeStyles({
  body: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
})

export const AppLayout = ({ appConfig, intl }) => {
  const classes = useStyles()

  return (
    <div className={classes.body}>
      <div className={classes.root}>
        <Drawer />
        <Routes />
        <ToastContainer />
        {appConfig.analyticsProps && (
          <Analytics {...appConfig.analyticsProps} />
        )}
        <PWAPrompt
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
            defaultMessage: '1) Press the \'Share\' button',
          })}
          copyAddHomeButtonLabel={intl.formatMessage({
            id: 'ios_prompt_add_to_home_button',
            defaultMessage: '2) Press \'Add to Home Screen\'',
          })}
          permanentlyHideOnDismiss={false}
        />
      </div>
    </div>
  )
}

export default withAppConfig(injectIntl(AppLayout))
