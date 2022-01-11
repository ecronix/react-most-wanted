import React, { useContext } from 'react'
import { useConfig } from 'base-shell/lib/providers/Config'
import Menu from '../../components/Menu/Menu';
import MenuContext from 'bootstrap-shell/lib/providers/Menu/Context';

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

  console.log(appConfig);
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

      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      />
    </React.Fragment>
  )
}
