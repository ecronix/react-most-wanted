import AppContainer from 'material-ui-shell/lib/containers/AppContainer/AppContainer'
import FirebaseContainer from 'rmw-shell/lib/containers/FirebaseContainer/FirebaseContainer'
import React, { useContext, useEffect } from 'react'
import configureStore from 'rmw-shell/lib/store'
import { Provider } from 'react-redux'

export default function ({ children }) {
  const store = configureStore({})

  return (
    <AppContainer>
      <Provider store={store}>
        <FirebaseContainer>{children}</FirebaseContainer>
      </Provider>
    </AppContainer>
  )
}
