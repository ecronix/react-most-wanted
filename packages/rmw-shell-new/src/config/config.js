import React, { lazy } from 'react'
import MUIConfig from 'material-ui-shell'
import getDefaultRoutes from './routes'
import merge from 'base-shell/lib/utils/config'
import { isAuthorised, getAuth } from '../utils/auth'

const config = {
  getDefaultRoutes,
  containers: {
    AppContainer: lazy(() => import('../containers/AppContainer/AppContainer')),
  },
  components: {
    Menu: lazy(() => import('../containers/Menu/Menu')),
  },
  auth: {
    localStorageAuthKey: 'rmw-shell:auth',
    isAuthenticated: isAuthorised,
    signInURL: '/signin',
    redirectTo: '/home',
    getData: () => {
      return getAuth()
    },
  },
  menu: {
    MenuHeader: lazy(() => import('../components/MenuHeader/MenuHeader')),
  },
  redux: {},
}

export default merge(MUIConfig, config)
