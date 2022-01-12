import React, { useContext } from 'react'
import Menu from '../../components/Menu/Menu'
import { useMenu } from '../../providers/Menu'
import LayoutContainer from '../LayoutContainer/LayoutContainer'

export default function ({
  children,
  brand,
  contentStyle,
}) {
  const m = useMenu()

  console.log('m', m)

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
