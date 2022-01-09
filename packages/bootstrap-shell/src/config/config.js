import { lazy } from 'react'
import parseLanguages from 'base-shell/lib/utils/locale'

const config = {
    containers: {
        AppContainer: lazy(() =>
            import('bootstrap-shell/lib/containers/AppContainer/AppContainer')
        ),
    },
    components: {
        Menu: lazy(() => import('bootstrap-shell/lib/containers/Menu/Menu')),
    },
    auth: {
        signInURL: '/signin',
    },
    pwa: {
        useiOSPWAPrompt: true,
        iOSPWAPromptProps: {},
    },
    //routes,
    locale: {
        /*locales,
        defaultLocale: parseLanguages(['en', 'de', 'ru'], 'en'),
        onError: (e) => {
            //console.warn(e)
            return
        },*/
    },
    menu: {
        MenuHeader: lazy(() => import('bootstrap-shell/lib/components/Menu/MenuHeader/MenuHeader')),
        MenuContent: lazy(() => import('bootstrap-shell/lib/components/Menu/MenuContent/MenuContent')),
        /*
        width: 240,
        offlineIndicatorHeight: 12,
        initialAuthMenuOpen: false,
        initialMiniMode: false,
        initialMenuOpen: true,
        initialMobileMenuOpen: false,
        initialMiniSwitchVisibility: true,
        
        useWindowWatcher: false,
        */
    },
    theme: {
        /*themes,
        defaultThemeID: 'default',
        defaultIsDarkMode: false,
        defaultIsRTL: false, //change this to true for default Right to Left Language support
        */
    },
    pages: {
        LandingPage: lazy(() => import('bootstrap-shell/lib/pages/Home/Home')),
        PageNotFound: lazy(() => import('../pages/PageNotFound/PageNotFound')),
    },
}

export default config
