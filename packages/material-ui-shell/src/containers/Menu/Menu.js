import React from 'react'
import ResponsiveMenu from '../ResponsiveMenu/ResponsiveMenu'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import SelectableMenuList from 'material-ui-shell/lib/containers/SelectableMenuList'
import { useAddToHomeScreen } from 'base-shell/lib/providers/AddToHomeScreen'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useConfig } from 'base-shell/lib/providers/Config'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { useLocale } from 'base-shell/lib/providers/Locale'
import { useMenu } from 'material-ui-shell/lib/providers/Menu'
import { useTheme } from 'material-ui-shell/lib/providers/Theme'

const Menu = (props) => {
  const intl = useIntl()
  const history = useHistory()
  const match = useRouteMatch()
  const auth = useAuth()
  const menuContext = useMenu()
  const a2HSContext = useAddToHomeScreen()
  const { menuStore } =
    menuContext || {}
  const { appConfig } = useConfig()
  const { setLocale, locale = 'en' } = useLocale()
  const { menu } = appConfig || {}
  const { MenuHeader, getMenuItems } = menu || {}
  const themeContext = useTheme()
  const menuItems = getMenuItems({
    intl,
    locale,
    updateLocale: setLocale,
    menuContext,
    themeContext,
    appConfig,
    a2HSContext,
    auth,
    ...props,
  }).filter((item) => {
    return item.visible !== false
  })

  const index = match ? match.path : '/'

  const handleChange = (event, index) => {
    if (index !== undefined) {
     /*  setMobileOpen(false) */
     console.log("WARNING: GOT HERE AT MENU.JS, SOMETHING TO DO WITH MINI, ATHENA")
    }
    if (index !== undefined && index !== Object(index)) {
      history.push(index)
    }
  }

  return (
    <ResponsiveMenu>
      {MenuHeader && <MenuHeader />}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Scrollbar style={{ flex: 1 }}>
          <SelectableMenuList
            items={menuItems}
            onIndexChange={handleChange}
            index={index}
            key={menuStore.miniMode}
            useMinified={menuStore.miniMode}
          />
        </Scrollbar>
      </div>
    </ResponsiveMenu>
  )
}

export default Menu
