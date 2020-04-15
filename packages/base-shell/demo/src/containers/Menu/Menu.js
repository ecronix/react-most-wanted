import React from 'react'
import { logout } from '../../utils/auth'
import { withRouter, Link } from 'react-router-dom'
import { default as withAppConfigs } from 'base-shell/lib/providers/ConfigProvider/withConfig'
import { injectIntl } from 'react-intl'
import { compose } from 'redux'

const Menu = ({ history, appConfig, intl }) => {
  const handleSignOut = (user) => {
    logout()
    history.push('/signin')
  }
  const itemsMenu = appConfig.getMenuItems
    ? appConfig
        .getMenuItems({ intl, auth: { ...appConfig.auth }, handleSignOut })
        .filter((item) => {
          return item.visible !== false
        })
    : []
  return (
    <div>
      MENU
      <nav>
        {itemsMenu.map((item, i) => {
          return (
            <li key={i}>
              <Link
                to={item.value}
                onClick={(e) => {
                  if (item.onClick) {
                    item.onClick()
                  }
                }}
              >
                {item.primaryText}
              </Link>
            </li>
          )
        })}
      </nav>
    </div>
  )
}
export default compose(injectIntl, withRouter, withAppConfigs)(Menu)
