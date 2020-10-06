import React, { useContext } from 'react'
import { useFirebase } from 'rmw-shell/lib/providers/Firebase'
import Menu from 'material-ui-shell/lib/containers/Menu/Menu'

export default function ({ children }) {
  const { firebaseApp } = useFirebase()

  return React.cloneElement(<Menu />, { firebaseApp })
}
