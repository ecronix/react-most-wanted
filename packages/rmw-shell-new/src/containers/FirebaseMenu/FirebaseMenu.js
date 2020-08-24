import React, { useContext } from 'react'
import FirebaseContext from 'rmw-shell/lib/providers/Firebase/Context'
import Menu from 'material-ui-shell/lib/containers/Menu/Menu'

export default function ({ children }) {
  const { firebaseApp } = useContext(FirebaseContext)

  return React.cloneElement(<Menu />, { firebaseApp })
}
