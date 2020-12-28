import React from 'react'
import getAppRoutes from '../../components/AppRoutes'
import { injectIntl } from 'react-intl'
import { withAppConfigs } from '../../contexts/AppConfigProvider'
import { Switch, withRouter } from 'react-router-dom'

export const Routes = ({ appConfig }) => {
  const customRoutes = appConfig.routes ? appConfig.routes : []
  const appRoutes = getAppRoutes(appConfig.firebaseLoad)

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Switch>
        {customRoutes.map((Route, i) => {
          return React.cloneElement(Route, { key: `@customRoutes/${i}` })
        })}
        {appRoutes.map((Route, i) => {
          return React.cloneElement(Route, { key: `@appRoutes/${i}` })
        })}
      </Switch>
    </div>
  )
}

export default withRouter(withAppConfigs(Routes))
