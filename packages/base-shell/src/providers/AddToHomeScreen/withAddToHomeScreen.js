import Context from './Context'
import React from 'react'

const withAddToHomeScreen = (Component) => {
  const ChildComponent = (props) => {
    return (
      <Context.Consumer>
        {(contextProps) => {
          return <Component {...contextProps} {...props} />
        }}
      </Context.Consumer>
    )
  }

  return ChildComponent
}

export default withAddToHomeScreen
