import routes from './routes'
import useEventListener from '../utils/useEventListener'

const config = {
  getDefaultRoutes: routes,
  useCustomHooks:{
    useEventListener
  },
  auth: {
    persistKey: 'base-shell:auth',
    signInURL: '/signin',
    redirectTo: '/',
  },
}

export default config
