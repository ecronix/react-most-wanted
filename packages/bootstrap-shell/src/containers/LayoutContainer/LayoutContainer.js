import { useConfig } from 'base-shell/lib/providers/Config'
import React from 'react'
import MenuProvider from 'bootstrap-shell/lib/providers/Menu/Provider'
import * as BS from "react-bootstrap";

export default function ({ children }) {
  const { appConfig } = useConfig()
  console.log("eeee")
  return (
    <BS.ThemeProvider >
      <MenuProvider>
        {children}
      </MenuProvider>
    </BS.ThemeProvider>
  )
}
