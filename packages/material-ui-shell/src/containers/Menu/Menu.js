import React from 'react'
import ResponsiveMenu from '../ResponsiveMenu/ResponsiveMenu'
import { useConfig } from 'base-shell/lib/providers/Config'

const Menu = (props) => {
  const { appConfig } = useConfig()
  const { menu } = appConfig || {}
  const { MenuHeader, MenuContent, BaseMenu } = menu || {}

  const Menu = BaseMenu || ResponsiveMenu

  return (
    <Menu>
      {MenuHeader && <MenuHeader />}
      {MenuContent && <MenuContent />}
    </Menu>
  )
}

export default Menu
