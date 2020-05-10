import React, { useContext } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import ConfigContext from 'base-shell/lib/providers/Config/Context'
import MenuContext from '../../providers/Menu/Context'
import { useIntl } from 'react-intl'
import ResponsiveMenu from '../ResponsiveMenu/ResponsiveMenu'
import MenuHeader from '../../components/MenuHeader/MenuHeader'
import SelectableMenuList from '../../containers/SelectableMenuList'
import LocaleContext from 'base-shell/lib/providers/Locale/Context'

const Menu = () => {
  const intl = useIntl()
  const history = useHistory()
  const match = useRouteMatch()

  const {
    isDesktopOpen,
    isMini,
    setDesktopOpen,
    setMobileOpen,
  } = useContext(MenuContext)

  const { appConfig } = useContext(ConfigContext)
  const { setLocale, locale = 'en' } = useContext(LocaleContext)

  const menuItems = appConfig
    .getMenuItems({
      intl,
      auth: appConfig.auth,
      locale,
      updateLocale: setLocale,
    })
    .filter((item) => {
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
      {/* <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider /> */}
      <MenuHeader />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <SelectableMenuList
            items={menuItems}
            onIndexChange={handleChange}
            index={index}
            useMinified={isMini && !isDesktopOpen}
          />
      </div>
    </ResponsiveMenu>
  )
}

export default Menu
