import MUIConfig from 'material-ui-shell'
import getDefaultRoutes from './routes'
import grants from './grants'
import merge from 'base-shell/lib/utils/config'
import { lazy } from 'react'

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
    grants,
  },
}

export default merge(MUIConfig, config)
