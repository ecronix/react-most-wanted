import DrawerContent from './DrawerContent'
import DrawerHeader from './DrawerHeader'
import React from 'react'
import ResponsiveDrawer from '../../containers/ResponsiveDrawer'
import { withAppConfigs } from '../../contexts/AppConfigProvider'
import { withRouter } from 'react-router-dom'

const Drawer = ({ history, appConfig }) => {
  const path = history.location.pathname
  const Header = appConfig.drawerHeader ? appConfig.drawerHeader : DrawerHeader

  return (
    <ResponsiveDrawer>
      <Header />
      <DrawerContent path={path} history={history} />
    </ResponsiveDrawer>
  )
}

export default withRouter(withAppConfigs(Drawer))
