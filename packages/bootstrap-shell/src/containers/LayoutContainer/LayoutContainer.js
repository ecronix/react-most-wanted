import { useConfig } from 'base-shell/lib/providers/Config'
import React from 'react'
import MenuProvider from '../../providers/Menu/Provider'
import * as BS from 'react-bootstrap'

const LayoutContent = ({ children }) => {
  console.log("Layoutcontent")

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      {children}
    </div>
  )
}

export default function ({ children }) {
  const { appConfig } = useConfig()
  console.log("Layout container");
  return (
    <React.Fragment>
      <MenuProvider appConfig={appConfig}>
        <LayoutContent>
          {children}
        </LayoutContent>
      </MenuProvider>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      />
    </React.Fragment>

  )
}
