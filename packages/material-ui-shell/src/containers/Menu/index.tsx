import React from 'react'
import { ResponsiveMenuContainer } from '@ecronix/material-ui-shell'
import { useConfig } from '@ecronix/base-shell'

/**
 * React component rendering MenuHeader and MenuContent. It loads data from config using useConfig hook.
 * It renders MenuHeader and MenuContent component if they are provided in application configuration under
 * menu scetion. As main wrapper it sets BaseMenu component defined in app config under menu section
 *
 * If MenuContainer is not provided it uses ResponsiveMenuContainer from material-ui-shell
 *
 * @example
 * appConfig: {
 *    components: {
 *      Menu: MenuContainer
 *    }
 * }
 * @see {ResponsiveMenuContainer} - for fallback component
 */
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
