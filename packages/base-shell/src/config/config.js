import routes from './routes'
import useEventListener from '../utils/useEventListener'

const config = {
  getDefaultRoutes: routes,
  customHooks:{
    useEventListener
  },
  loader: {
    loadedWithErrorInterval : 5000,
  },
  auth: {
    persistKey: 'base-shell:auth',
    signInURL: '/signin',
    redirectTo: '/',
  },
}

export default config
