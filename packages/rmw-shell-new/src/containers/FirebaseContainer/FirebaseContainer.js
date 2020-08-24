import React, { useContext, useEffect } from 'react'
import ConfigContext from 'base-shell/lib/providers/Config/Context'
import FirebaseProvider from 'rmw-shell/lib/providers/Firebase/Provider'
import { withFirebase } from 'firekit-provider'
import FirebaseContext from 'rmw-shell/lib/providers/Firebase/Context'
import { saveAuthorisation } from 'rmw-shell/lib/utils/auth'

export default function ({ children }) {
  const { appConfig } = useContext(ConfigContext)
  const { firebaseApp, watchAuth } = useContext(FirebaseContext)

  useEffect(() => {
    watchAuth(firebaseApp, (user) => {})
  }, [])

  return (
    <FirebaseProvider firebaseApp={firebaseApp}>{children}</FirebaseProvider>
  )
}
