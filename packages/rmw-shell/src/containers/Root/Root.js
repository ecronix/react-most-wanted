import AppConfigProvider from '../../contexts/AppConfigProvider/Provider'
import AppLayout from '../../containers/AppLayout'
import CssBaseline from '@material-ui/core/CssBaseline'
import Helmet from 'react-helmet'
import React, { useEffect } from 'react'
import Utils from '@date-io/moment'
import getThemeSource from '../../config/themes'
import locales, { getLocaleMessages } from '../../config/locales'
import { IntlProvider } from 'react-intl'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import { bindActionCreators } from 'redux'
import { createBrowserHistory } from 'history'
import { createMuiTheme } from '@material-ui/core/styles'
import { initializeMessaging } from '../../utils/messaging'
import { saveAuthorisation } from '../../utils/auth'
import { setPersistentValue } from '../../store/persistentValues/actions'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import {
  watchAuth,
  clearInitialization,
  initConnection,
  watchList,
  initMessaging,
  watchPath,
} from 'firekit'
import { withA2HS } from 'a2hs'

const history = createBrowserHistory()

const getActions = dispatch => {
  return bindActionCreators(
    {
      watchAuth,
      clearInitialization,
      watchConnection: initConnection,
      watchList,
      watchPath,
      initMessaging,
      setPersistentValue,
    },
    dispatch
  )
}

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
  const themeSource = useSelector(state => state.themeSource, shallowEqual)
  const auth = useSelector(state => state.auth, shallowEqual)
  const messages = {
    ...getLocaleMessages(locale, locales),
    ...getLocaleMessages(locale, appConfig.locales),
  }
  const source = getThemeSource(themeSource, appConfig.themes)
  const theme = createMuiTheme(source)
  let showInstallPrompt =
    auth.isAuthorised && isAppInstallable && !isAppInstalled

  const handleInstallPrompt = () => {
    if (!installPromptShowed && showInstallPrompt) {
      installPromptShowed = true
      deferredPrompt.prompt()
    }
  }

  const handlePresence = (user, firebaseApp) => {
    let myConnectionsRef = firebaseApp
      .database()
      .ref(`users/${user.uid}/connections`)

    let lastOnlineRef = firebaseApp
      .database()
      .ref(`users/${user.uid}/lastOnline`)
    lastOnlineRef.onDisconnect().set(new Date())

    let con = myConnectionsRef.push(true)
    con.onDisconnect().remove()
  }

  const onAuthStateChanged = (user, firebaseApp) => {
    saveAuthorisation(user)
    clearInitialization()

    if (user) {
      handlePresence(user, firebaseApp)
      setTimeout(() => {
        watchConnection(firebaseApp)
      }, 1000)

      const userData = {
        displayName: user.displayName ? user.displayName : 'UserName',
        email: user.email ? user.email : ' ',
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        isAnonymous: user.isAnonymous,
        uid: user.uid,
        providerData: user.providerData,
      }

      let publicProviderData = []

      user.providerData.forEach(provider => {
        publicProviderData.push({
          providerId: provider.providerId,
          displayName: provider.displayName ? provider.displayName : null,
        })
      })

      const publicUserData = {
        displayName: user.displayName ? user.displayName : 'UserName',
        photoURL: user.photoURL,
        uid: user.uid,
        providerData: publicProviderData,
      }

      watchList(firebaseApp, `user_grants/${user.uid}`)
      watchPath(firebaseApp, `admins/${user.uid}`)
      watchPath(firebaseApp, `users/${user.uid}`)

      if (appConfig.onAuthStateChanged) {
        try {
          appConfig.onAuthStateChanged(
            user,
            { ...props, ...actions },
            firebaseApp
          )
        } catch (err) {
          console.warn(err)
        }
      }

      firebaseApp
        .database()
        .ref(`users/${user.uid}`)
        .update(publicUserData)

      initializeMessaging(
        {
          ...props,
          ...actions,
          initMessaging,
          firebaseApp,
          history,
          auth: userData,
        },
        true
      )

      return userData
    } else {
      return null
    }
  }

  useEffect(() => {
    appConfig.firebaseLoad().then(({ firebaseApp }) => {
      watchAuth(firebaseApp, user => onAuthStateChanged(user, firebaseApp))
    })
  }, [])

  return (
    <div
      onClick={
        !installPromptShowed && showInstallPrompt
          ? handleInstallPrompt
          : undefined
      }
    >
      <Helmet>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.firebase.com/libs/firebaseui/3.0.0/firebaseui.css"
        />
      </Helmet>
      <AppConfigProvider appConfig={appConfig}>
        <MuiPickersUtilsProvider utils={Utils}>
          <ThemeProvider theme={theme}>
            <React.Fragment>
              <CssBaseline />
              <IntlProvider locale={locale} key={locale} messages={messages}>
                <Router history={history}>
                  <Switch>
                    <Route component={AppLayout} />
                  </Switch>
                </Router>
              </IntlProvider>
            </React.Fragment>
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </AppConfigProvider>
    </div>
  )
}

export default withA2HS(Root)
