import React, { Suspense, useContext } from 'react'
import getDefaultRoutes from '../../components/DefaultRoutes/DefaultRoutes'
import LocaleContext from '../../providers/Locale/Context'
import ConfigContext from '../../providers/Config/Context'
import LocaleProvider from '../../providers/Locale/Provider'
import { IntlProvider } from 'react-intl'
import { Switch } from 'react-router-dom'
import { getLocaleMessages } from '../../utils/locale'

export const LayoutContent = () => {
  const { appConfig } = useContext(ConfigContext)
  const { components, routes: appRoutes = [], containers, locale: confLocale } =
    appConfig || {}
  const { Menu, Loading } = components || {}
  const { locales } = confLocale || {}
  const { LayoutContainer = React.Fragment } = containers || {}
  const defaultRoutes = getDefaultRoutes(appConfig)
  const { locale } = useContext(LocaleContext)
  const messages = {
    ...getLocaleMessages(locale, locales),
  }

  return (
    <IntlProvider locale={locale} key={locale} messages={messages}>
      <LayoutContainer>
        {Menu && <Menu />}
        <Suspense fallback={<Loading />}>
          <Switch>
            {appRoutes.map((Route, i) => {
              return React.cloneElement(Route, { key: `@customRoutes/${i}` })
            })}
            {defaultRoutes.map((Route, i) => {
              return React.cloneElement(Route, { key: `@defaultRoutes/${i}` })
            })}
          </Switch>
        </Suspense>
      </LayoutContainer>
    </IntlProvider>
  )
}

export const Layout = () => {
  const { appConfig } = useContext(ConfigContext)
  const { locale } = appConfig
  const { defaultLocale, persistKey } = locale || {}
  return (
    <LocaleProvider defaultLocale={defaultLocale} persistKey={persistKey}>
      <LayoutContent appConfig={appConfig} />
    </LocaleProvider>
  )
}

export default Layout
