import React, { useContext } from 'react'
import ConfigContext from 'base-shell/lib/providers/Config/Context'
import AppContainer from 'material-ui-shell/lib/containers/AppContainer/AppContainer'
import FirebaseProvider from 'firekit-provider'
import { ReactReduxContext } from 'react-redux'
import { Provider } from 'react-redux'
import configureStore from '../../store'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/messaging'

export default function ({ children }) {
  const { appConfig } = useContext(ConfigContext)
  const { firebase: firebaseConfig } = appConfig || {}
  const { config_dev, config_prod } = firebaseConfig || {}
  const store = configureStore({})
  const firebaseApp = firebase.initializeApp(
    process.env.NODE_ENV !== 'production' ? config_dev : config_prod
  )

  return (
    <AppContainer>
      <Provider store={store}>
        <FirebaseProvider firebaseApp={firebaseApp} context={ReactReduxContext}>
          {children}
        </FirebaseProvider>
      </Provider>
    </AppContainer>
  )
}
