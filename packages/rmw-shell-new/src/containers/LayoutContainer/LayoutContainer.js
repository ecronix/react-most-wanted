import LayoutContainer from 'material-ui-shell/lib/containers/LayoutContainer/LayoutContainer'
import FirebaseContainer from 'rmw-shell/lib/containers/FirebaseContainer/FirebaseContainer'
import React, { useContext, useEffect } from 'react'

export default function ({ children }) {
  return (
    <LayoutContainer>
      <FirebaseContainer>{children}</FirebaseContainer>
    </LayoutContainer>
  )
}
