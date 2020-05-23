import React, { lazy } from 'react'
import Loading from '../components/Loading/Loading'

const config = {
  containers: {
    AppContainer: lazy(() => import('../containers/AppContainer/AppContainer')),
    LayoutContainer: lazy(() =>
      import('../containers/LayoutContainer/LayoutContainer')
    ),
  },
  components: {
    Loading,
    Menu: lazy(() => import('../containers/Menu/Menu')),
    UpdateDialog: lazy(() => import('../components/UpdateDialog/UpdateDialog')),
  },
  pwa: {
    useiOSPWAPrompt: true,
    iOSPWAPromptProps: {},
    useUpdateDialog: true,
  },
  menu: {
    width: 240,
    offlineIndicatorHeight: 12,
    useMini: true,
    MenuHeader: lazy(() => import('../components/MenuHeader/MenuHeader')),
  },
  pages: {
    LandingPage: () => <div>Landing Page MUI</div>,
    PageNotFound: lazy(() => import('../pages/PageNotFound/PageNotFound')),
  },
}

export default config
