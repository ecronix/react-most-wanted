import LayoutContainer from 'material-ui-shell/lib/containers/LayoutContainer/LayoutContainer'
import FirebaseContainer from '../../containers/FirebaseContainer/FirebaseContainer'
import React from 'react'

export default function ({ children }) {
  return (
    <LayoutContainer>
      <FirebaseContainer>{children}</FirebaseContainer>
    </LayoutContainer>
  )
}
