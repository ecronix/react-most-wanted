import React, { lazy } from 'react'
import MUIConfig from 'material-ui-shell'
import getDefaultRoutes from './routes'
import merge from 'base-shell/lib/utils/config'

const config = {
  getDefaultRoutes,
  containers: {
    AppContainer: lazy(() => import('../containers/AppContainer/AppContainer')),
  },
  components: {
    Menu: lazy(() => import('../containers/FirebaseMenu/FirebaseMenu')),
  },
  auth: {
    persistKey: 'rmw-shell:auth',
    signInURL: '/signin',
    redirectTo: '/home',
  },
}

export default merge(MUIConfig, config)
