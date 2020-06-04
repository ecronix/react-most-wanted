import React, { useContext } from 'react'
import ConfigContext from 'base-shell/lib/providers/Config/Context'
import AppContainer from 'material-ui-shell/lib/containers/AppContainer/AppContainer'
//import FirebaseProvider from 'firekit-provider'
import FirebaseProvider from 'rmw-shell/lib/providers/Firebase/Provider'
import { Provider } from 'react-redux'
import configureStore from '../../store'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/messaging'

let firebaseApp = null

export default function ({ children }) {
  const { appConfig } = useContext(ConfigContext)
  const { firebase: firebaseConfig } = appConfig || {}
  const { config_dev, config_prod } = firebaseConfig || {}
  const store = configureStore({})

  //Firebase app should be initialized only once
  if (firebase.apps.length === 0) {
    firebaseApp = firebase.initializeApp(
      process.env.NODE_ENV !== 'production' ? config_dev : config_prod
    )
  } else {
    firebaseApp = firebase.apps[0]
  }

  return (
    <AppContainer>
      <Provider store={store}>
        <FirebaseProvider firebaseApp={firebaseApp}>
          {children}
        </FirebaseProvider>
      </Provider>
    </AppContainer>
  )
}
