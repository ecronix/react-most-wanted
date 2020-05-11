import React, { lazy } from 'react'
import Loading from '../components/Loading/Loading'

const config = {
  containers: {
    AppContainer: lazy(() => import('../containers/AppContainer/AppContainer')),
  },
  components: {
    Loading,
    Menu: lazy(() => import('../containers/Menu/Menu')),
  },
  menu: {
    width: 240,
    useMini: true,
    MenuHeader: lazy(() => import('../components/MenuHeader/MenuHeader')),
  },
  pages: {
    LandingPage: () => <div>Landing Page MUI</div>,
    PageNotFound: lazy(() => import('../pages/PageNotFound/PageNotFound')),
  },
}

export default config
