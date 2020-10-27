import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Context from './Context'

class Provider extends Component {
  render() {
    const { appConfig, children } = this.props

    return <Context.Provider value={{ appConfig }}>{children}</Context.Provider>
  }
}

Provider.propTypes = {
  children: PropTypes.any,
  appConfig: PropTypes.object.isRequired
}

export default Provider
