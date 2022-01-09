import React from 'react'
import ResponsiveMenu from '../ResponsiveMenu/ResponsiveMenu'
import { useConfig } from 'base-shell/lib/providers/Config'

const Menu = () => {
  const { appConfig } = useConfig()
  const { menu } = appConfig || {}
  const { MenuHeader, MenuContent } = menu || {}

  return (
    <ResponsiveMenu>
      {MenuHeader && <MenuHeader />}
      {MenuContent && <MenuContent />}
    </ResponsiveMenu>
  )
}

export default Menu
