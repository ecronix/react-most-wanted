import Context from './Context'
import React from 'react'

const withOnline = (Component) => {
  const ChildComponent = (props) => {
    return (
      <Context.Consumer>
        {(value) => {
          return <Component isOnline={value} {...props} />
        }}
      </Context.Consumer>
    )
  }

  return ChildComponent
}

export default withOnline
