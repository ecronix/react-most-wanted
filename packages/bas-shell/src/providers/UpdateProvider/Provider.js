import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Context from './Context'
import isUpdateAwailable, { handleUpdate } from '../../utils/updates'

class Provider extends Component {
  state = {
    updateAvailable: false,
    handleUpdate: false,
  }

  checkUpdate = () => {
    if (isUpdateAwailable()) {
      this.setState({ updateAvailable, handleUpdate })
    } else {
      this.setState({ updateAvailable: false, handleUpdate: false })
    }
  }

  componentDidMount() {
    const { appConfig } = this.props
    const { update } = appConfig || {}
    const { checkInterval = 5000 } = update || {}

    checkUpdate()
    setTimeout(checkUpdate, checkInterval)
  }

  render() {
    const { appConfig, children } = this.props

    return (
      <Context.Provider value={{ ...this.state }}>{children}</Context.Provider>
    )
  }
}

Provider.propTypes = {
  children: PropTypes.any,
  appConfig: PropTypes.object.isRequired,
}

export default Provider
