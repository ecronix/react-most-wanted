import React, { Suspense } from 'react'
import getDefaultRoutes from '../../components/DefaultRoutes/DefaultRoutes'
import withConfig from '../../providers/ConfigProvider/withConfig'
import { IntlProvider } from 'react-intl'
import { Switch } from 'react-router-dom'
import { getLocaleMessages } from '../../utils/localeTools'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'

export const AppLayout = ({ appConfig, intl }) => {
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

export default withConfig(AppLayout)
