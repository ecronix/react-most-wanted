import { lazy } from 'react'

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
  },
  pwa: {
    useiOSPWAPrompt: true,
    iOSPWAPromptProps: {},
  },
  // menu: {
  //   width: 240,
  //   offlineIndicatorHeight: 12,
  //   initialAuthMenuOpen: false,
  //   initialMiniMode: false,
  //   initialMenuOpen: true,
  //   initialMobileMenuOpen: false,
  //   initialMiniSwitchVisibility: true,
  //   MenuHeader: lazy(() => import('../components/MenuHeader/MenuHeader')),
  //   useWindowWatcher: false,
  // },
  pages: {
    LandingPage: lazy(() => import('../pages/ModalDemo/ModalDemo')),
  },
  update: {
    checkInterval: 3000,
    repeatInterval: 300000,
  },
}

export default config
