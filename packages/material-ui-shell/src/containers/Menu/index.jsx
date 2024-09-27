import React from 'react'
import ResponsiveMenu from '../ResponsiveMenu'
import { useConfig } from '@ecronix/base-shell'

export default function Menu() {
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
