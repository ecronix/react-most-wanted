import React, { useContext } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import ConfigContext from 'base-shell/lib/providers/Config/Context'
import MenuContext from 'material-ui-shell/lib/providers/Menu/Context'
import { useIntl } from 'react-intl'
import ResponsiveMenu from '../ResponsiveMenu/ResponsiveMenu'
import SelectableMenuList from 'material-ui-shell/lib/containers/SelectableMenuList'
import LocaleContext from 'base-shell/lib/providers/Locale/Context'
import A2HSContext from 'base-shell/lib/providers/AddToHomeScreen/Context'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import ThemeContext from 'material-ui-shell/lib/providers/Theme/Context'

const Menu = (props) => {
  const intl = useIntl()
  const history = useHistory()
  const match = useRouteMatch()
  const menuContext = useContext(MenuContext)
  const a2HSContext = useContext(A2HSContext)
  const {
    isDesktopOpen,
    isMini,
    setDesktopOpen,
    setMobileOpen,
    useMiniMode,
  } = menuContext
  const { appConfig } = useContext(ConfigContext)
  const { setLocale, locale = 'en' } = useContext(LocaleContext)
  const { menu } = appConfig || {}
  const { MenuHeader, getMenuItems } = menu || {}
  const themeContext = useContext(ThemeContext)
  const menuItems = getMenuItems({
    intl,
    locale,
    updateLocale: setLocale,
    menuContext,
    themeContext,
    appConfig,
    a2HSContext,
    ...props,
  }).filter((item) => {
    return item.visible !== false
  })

  const index = match ? match.path : '/'

  const handleChange = (event, index) => {
    if (index !== undefined) {
      setMobileOpen(false)
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
            key={useMiniMode}
            useMinified={isMini && !isDesktopOpen}
          />
        </Scrollbar>
      </div>
    </ResponsiveMenu>
  )
}

export default Menu
