import { lazy } from 'react'
import routes from './routes'

const config = {
    containers: {
        LayoutContainer: lazy(() =>
            import('bootstrap-shell/lib/containers/LayoutContainer/LayoutContainer')
        ),
    },
    components: {
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
    locale: {},
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