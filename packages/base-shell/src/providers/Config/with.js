import Context from './Context'
import React from 'react'

const withContainer = (Component) => {
  const ChildComponent = (props) => {
    return (
      <Context.Consumer>
        {(value) => {
          const { appConfig } = value || {}
          return <Component appConfig={appConfig} {...props} />
        }}
      </Context.Consumer>
    )
  }

  return ChildComponent
}

export default withContainer
