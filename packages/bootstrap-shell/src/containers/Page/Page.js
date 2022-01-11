import React, { useContext } from 'react'
import { useConfig } from 'base-shell/lib/providers/Config'
import Menu from '../../components/Menu/Menu'
import { useMenu } from '../..//providers/Menu/Context'

export default function ({
  children,
  brand,
  onBackClick,
  isLoading,
  appBarContent = null,
  contentStyle,
  tabs = null,
}) {
  const { appConfig } = useConfig()
  const { menu } = appConfig || {}
  const { width = 240 } = menu || {}
  const { routes } = appConfig || {}
  const m = useMenu()

  console.log('m', m)

  console.log(appConfig)
  let headerTitle = ''

  if (typeof brand === 'string' || brand instanceof String) {
    headerTitle = brand
  }

  return (
    <React.Fragment>
      <Menu brand={headerTitle} />
      <div style={{ flex: 1, overflow: 'auto', ...contentStyle }}>
        {children}
      </div>
    </React.Fragment>
  )
}
