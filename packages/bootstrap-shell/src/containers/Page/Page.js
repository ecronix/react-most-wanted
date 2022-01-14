import React, { useContext } from 'react'
import Menu from '../../components/Menu/Menu'
import { useMenu } from '../../providers/Menu'
import * as BS from "react-bootstrap"

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
      <BS.Container>
        <BS.Row>
          <Menu brand={headerTitle} />
        </BS.Row>
        <BS.Row>
          <div style={{ flex: 1, overflow: 'auto', ...contentStyle }}>
            {children}
          </div>
        </BS.Row>
      </BS.Container>
    </React.Fragment>
  )
}

export default Page