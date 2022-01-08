import React from 'react'
import { useConfig } from 'base-shell/lib/providers/Config'
import { ThemeProvider } from "react-bootstrap"

export default function ({ children }) {
  const { appConfig } = useConfig()

  return (
    <React.Fragment>
      <ThemeProvider>
        <div
          style={{
            display: 'flex',
          }}
        >
          {children}
        </div>
      </ThemeProvider>
    </React.Fragment>
  )
}
