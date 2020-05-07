import Context from './Context'
import React from 'react'
import config from '../../config'
import merge from '../../utils/config'

const withAppConfigs = (Component) => {
  const ChildComponent = (props) => {
    return (
      <Context.Consumer>
        {(value) => {
          const { appConfig } = value || {}
          return <Component appConfig={merge(config, appConfig)} {...props} />
        }}
      </Context.Consumer>
    )
  }

  return ChildComponent
}

export default withAppConfigs
