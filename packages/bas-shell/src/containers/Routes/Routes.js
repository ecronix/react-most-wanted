import AppConfigProvider from '../../contexts/AppConfigProvider/Provider'
import AppLayout from '../../containers/AppLayout'
import Helmet from 'react-helmet'
import React, { useEffect } from 'react'
import locales, { getLocaleMessages } from '../../config/locales'
import { IntlProvider } from 'react-intl'
import { Router, Route, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { createBrowserHistory } from 'history'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { withA2HS } from 'a2hs'

const history = createBrowserHistory()

let installPromptShowed = false

const Root = props => {
  const actions = getActions(useDispatch())
  const {
    watchAuth,
    clearInitialization,
    watchConnection,
    watchList,
    watchPath,
    initMessaging,
  } = actions
  const { appConfig, deferredPrompt, isAppInstallable, isAppInstalled } = props
  const locale = useSelector(state => state.locale, shallowEqual)
  const messages = {
    ...getLocaleMessages(locale, locales),
    ...getLocaleMessages(locale, appConfig.locales),
  }
  let showInstallPrompt =
    auth.isAuthorised && isAppInstallable && !isAppInstalled

  const handleInstallPrompt = () => {
    if (!installPromptShowed && showInstallPrompt) {
      installPromptShowed = true
      deferredPrompt.prompt()
    }
  }

  return (
    <div
      onClick={
        !installPromptShowed && showInstallPrompt
          ? handleInstallPrompt
          : undefined
      }
    >
      <React.Fragment>
        <IntlProvider locale={locale} key={locale} messages={messages}>
          <Router history={history}>
            <Switch>
              <Route component={AppLayout} />
            </Switch>
          </Router>
        </IntlProvider>
      </React.Fragment>
    </div>
  )
}

export default withA2HS(Root)
