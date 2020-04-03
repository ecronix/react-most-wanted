import React from 'react'
import getDefaultRoutes from '../../components/DefaultRoutes/DefaultRoutes'
import withConfig from '../../providers/ConfigProvider/withConfig'
import { Switch } from 'react-router-dom'

export const Routes = ({ appConfig }) => {
  const appRoutes = appConfig.routes ? appConfig.routes : []
  const defaultRoutes = getDefaultRoutes(appConfig)

  console.log('appConfig', appConfig)
  console.log('appRoutes', appRoutes)

  return (
    <React.Fragment>
      <Switch>
        {appRoutes.map((Route, i) => {
          return React.cloneElement(Route, { key: `@customRoutes/${i}` })
        })}
        {defaultRoutes.map((Route, i) => {
          return React.cloneElement(Route, { key: `@defaultRoutes/${i}` })
        })}
      </Switch>
    </React.Fragment>
  )
}

export default withConfig(Routes)
