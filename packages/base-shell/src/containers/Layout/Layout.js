import React, { Suspense } from 'react'
import configureStore from '../..//utils/store'
import getDefaultRoutes from '../../components/DefaultRoutes/DefaultRoutes'
import withConfig from '../../providers/ConfigProvider/withConfig'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { Switch } from 'react-router-dom'
import { getLocaleMessages } from '../../utils/locale'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'

export const LayoutContent = ({ appConfig, intl }) => {
  const { components, routes: appRoutes = [], containers } = appConfig || {}
  const { Menu, Loading } = components || {}
  const { LayoutContainer = React.Fragment } = containers || {}
  const defaultRoutes = getDefaultRoutes(appConfig)
  const locale = useSelector((state) => state.locale, shallowEqual)
  const messages = {
    ...getLocaleMessages(locale, appConfig.locales),
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

export const Layout = ({ appConfig }) => {
  const { redux = {} } = appConfig || {}

  const { configureStore: _configureStore, configureStoreProps } = redux || {}
  const store = _configureStore
    ? _configureStore(configureStoreProps)
    : configureStore(configureStoreProps)

  return (
    <Provider store={store}>
      <LayoutContent appConfig={appConfig} />
    </Provider>
  )
}

export default withConfig(Layout)
