import React from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import SelectableMenuList from 'material-ui-shell/lib/containers/SelectableMenuList'
import { useAddToHomeScreen } from 'base-shell/lib/providers/AddToHomeScreen'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useConfig } from 'base-shell/lib/providers/Config'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { useLocale } from 'base-shell/lib/providers/Locale'
import { useMenu } from 'material-ui-shell/lib/providers/Menu'
import { useTheme as useAppTheme } from 'material-ui-shell/lib/providers/Theme'
import getMenuItems from '../../config/menuItems'

const Menu = (props) => {
  const intl = useIntl()
  const history = useHistory()
  const match = useRouteMatch()
  const auth = useAuth()
  const menuContext = useMenu()
  const a2HSContext = useAddToHomeScreen()
  const { toggleThis, isMiniMode, isMiniSwitchVisibility } = menuContext || {}
  const { appConfig } = useConfig()
  const { setLocale, locale = 'en' } = useLocale()
  const themeContext = useAppTheme()

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
      toggleThis('isMobileMenuOpen', false)
    }
    if (index !== undefined && index !== Object(index)) {
      history.push(index)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        /*  direction: isRTL ? 'rtl' : 'ltr' */
      }}
    >
      <Scrollbar style={{ flex: 1 }}>
        <SelectableMenuList
          key={isMiniSwitchVisibility + themeContext.isRTL}
          onIndexChange={handleChange}
          useMinified={isMiniMode}
          items={menuItems}
          index={index}
        />
      </Scrollbar>
    </div>
  )
}

export default Menu
