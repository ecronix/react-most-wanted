import React, { useContext } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import ConfigContext from 'base-shell/lib/providers/Config/Context'
import MenuContext from '../../providers/Menu/Context'
import { useIntl } from 'react-intl'
import ResponsiveMenu from '../ResponsiveMenu/ResponsiveMenu'
//import MenuHeader from '../../components/MenuHeader/MenuHeader'
import SelectableMenuList from '../../containers/SelectableMenuList'
import LocaleContext from 'base-shell/lib/providers/Locale/Context'
import Scrollbar from '../../components/Scrollbar/Scrollbar'

const Menu = () => {
  const intl = useIntl()
  const history = useHistory()
  const match = useRouteMatch()
  const menuContext = useContext(MenuContext)
  const { isDesktopOpen, isMini, setDesktopOpen, setMobileOpen, useMiniMode } = menuContext
  const { appConfig } = useContext(ConfigContext)
  const { setLocale, locale = 'en' } = useContext(LocaleContext)
  const { menu } = appConfig || {}
  const { MenuHeader, getMenuItems } = menu || {}

  const menuItems = getMenuItems({
    intl,
    locale,
    updateLocale: setLocale,
    menuContext,
    appConfig,
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
        <Scrollbar>
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