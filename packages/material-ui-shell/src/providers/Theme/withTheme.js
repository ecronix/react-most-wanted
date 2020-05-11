import Context from './Context'
import React from 'react'

const withTheme = (Component) => {
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

export default withTheme
