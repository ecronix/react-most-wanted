import React, { lazy } from 'react'
import MUIConfig from 'material-ui-shell'
import getDefaultRoutes from './routes'
import merge from 'base-shell/lib/utils/config'

const config = {
  getDefaultRoutes,
  containers: {
    LayoutContainer: lazy(() =>
      import('../containers/LayoutContainer/LayoutContainer')
    ),
  },
  components: {
    Menu: lazy(() => import('../containers/FirebaseMenu/FirebaseMenu')),
  },
  auth: {
    persistKey: 'rmw-shell:auth',
    signInURL: '/signin',
    redirectTo: '/home',
  },
  menu: {
    MenuHeader: lazy(() => import('../components/MenuHeader/MenuHeader')),
  },
}

export default merge(MUIConfig, config)
