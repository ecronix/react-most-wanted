import React, { Component } from 'react'
import App from 'base-shell/lib'
import MUIConfig from 'rmw-shell/lib/config'
import merge from 'base-shell/lib/utils/config'
import _config from './config'

const config = merge(MUIConfig, _config)

export default class Demo extends Component {
  render() {
    return <App config={config} />
  }
}
