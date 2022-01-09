import React, { Component } from 'react'
import App from 'base-shell/lib'
import BootstrapConfig from 'bootstrap-shell/lib'
import merge from 'base-shell/lib/utils/config'
import _config from './config'

const config = merge(BootstrapConfig, _config)

export default class Demo extends Component {
  render() {
    return <App config={config} />
  }
}
