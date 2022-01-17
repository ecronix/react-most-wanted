import React, { useContext } from 'react'
import Menu from '../../components/Menu/Menu'
import { useMenu } from '../../providers/Menu'
import LayoutContainer from '../LayoutContainer/LayoutContainer'

const Page = ({
  children,
  brand,
  contentStyle,
}) => {
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

export default Page