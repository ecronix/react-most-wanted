import { lazy } from 'react'
import routes from './routes'
import Loading from '../components/Loading/Loading'
import locales from './locales'
import parseLanguages from 'base-shell/lib/utils/locale'

const config = {
    containers: {
        LayoutContainer: lazy(() =>
            import('bootstrap-shell/lib/containers/LayoutContainer/LayoutContainer')
        ),
    },
    components: {
        Loading,
        Menu: lazy(() => import('bootstrap-shell/lib/components/Menu/Menu')),
    },
    auth: {
        signInURL: '/signin',
    },
    pwa: {
        useiOSPWAPrompt: true,
        iOSPWAPromptProps: {},
    },
    routes,
    locale: {
        locales,
        defaultLocale: parseLanguages(['en', 'de', 'ru'], 'en'),
        onError: (e) => {
            //console.warn(e)
            return
        },
    },
    menu: {
        MenuRight: lazy(() => import('../components/Menu/MenuRight')),
    },
    theme: {},
    pages: {
        // The LandingPage is completely separeted from the App and is not under the LayoutContainer
        LandingPage: lazy(() => import('../pages/LandingPage')),
        PageNotFound: lazy(() => import('../pages/PageNotFound/PageNotFound')),
    },
}

export default config