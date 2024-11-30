import React from 'react'
import { ResponsiveMenuContainer } from '@ecronix/material-ui-shell'
import { useConfig } from '@ecronix/base-shell'

export function MenuContainer() {
  const { appConfig } = useConfig()
  const { menu } = appConfig || {}
  const { MenuHeader, MenuContent, BaseMenu } = menu || {}

  const Menu = BaseMenu || ResponsiveMenuContainer

  return (
    <Menu>
      {MenuHeader && <MenuHeader />}
      {MenuContent && <MenuContent />}
    </Menu>
  )
}
