import React from 'react'
import { logout } from '../../utils/auth'
import { withRouter, Link } from 'react-router-dom'
import { default as withAppConfigs } from 'base-shell/lib/providers/ConfigProvider/withConfig'
import { compose } from 'redux'

const Menu = ({ history, appConfig }) => {
  const handleSignOut = async (user) => {
    logout()
    history.push('/signin');
  }
  const itemsMenu = appConfig.getMenuItems({ auth: { ...appConfig.auth }, handleSignOut }).filter(item => {
    return item.visible !== false
  })
  return (
    <div>
      MENU
      <nav>
        {
          itemsMenu.map((item, i) => {
            return (
              <li key={i}>
                <Link to={item.value} onClick={e => {
                  if (item.onClick) {
                    item.onClick()
                  }
                }} >{item.primaryText}</Link>
              </li>
            );
          })
        }
      </nav>
    </div>
  )
}
export default compose(
  withRouter,
  withAppConfigs,
)(Menu)
