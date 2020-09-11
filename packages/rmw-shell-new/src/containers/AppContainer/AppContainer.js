import AppContainer from 'material-ui-shell/lib/containers/AppContainer/AppContainer'
import FirebaseContainer from 'rmw-shell/lib/containers/FirebaseContainer/FirebaseContainer'
import React, { useContext, useEffect } from 'react'

export default function ({ children }) {
  return (
    <AppContainer>
      <FirebaseContainer>{children}</FirebaseContainer>
    </AppContainer>
  )
}
