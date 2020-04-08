import React, { Suspense } from 'react'
import withConfig from '../../providers/ConfigProvider/withConfig'
import getDefaultRoutes from '../../components/DefaultRoutes/DefaultRoutes'
import { Switch } from 'react-router-dom'

export const AppLayout = ({ appConfig, intl }) => {
  const { components, routes: appRoutes = [], containers } = appConfig || {}
  const { Menu, Loading } = components || {}
  const { LayoutContainer = React.Fragment } = containers || {}
  const defaultRoutes = getDefaultRoutes(appConfig)

  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

export default withConfig(AppLayout)
