import routes from './routes'

const config = {
  getDefaultRoutes: routes,
  auth: {
    persistKey: 'base-shell:auth',
    signInURL: '/signin',
    redirectTo: '/',
  },
}

export default config
