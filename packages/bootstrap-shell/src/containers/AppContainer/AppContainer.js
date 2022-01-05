import React from 'react'
import { useConfig } from 'base-shell/lib/providers/Config'

export default function ({ children }) {
  const { appConfig } = useConfig()

  return (
    <React.Fragment>
      <MenuProvider appConfig={appConfig}>
        <ThemeProvider appConfig={appConfig}>
          <div
            style={{
              display: 'flex',
            }}
          >
            {children}
          </div>
        </ThemeProvider>
      </MenuProvider>
    </React.Fragment>
  )
}
