import React from 'react'
import { useConfig } from 'base-shell/lib/providers/Config'

export default function ({ children }) {
  const { appConfig } = useConfig()

  return (
    <React.Fragment>
      <div
        style={{
          display: 'flex',
        }}
      >
        {children}
      </div>
    </React.Fragment>
  )
}
