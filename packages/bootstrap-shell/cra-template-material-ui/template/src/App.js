import React, { Component } from 'react'
import App from 'base-shell/lib'
import MUIConfig from 'material-ui-shell/lib'
import merge from 'base-shell/lib/utils/config'
import _config from './config'

import 'bootstrap/dist/css/bootstrap.min.css'

const config = merge(MUIConfig, _config)

export default class Demo extends Component {
  render() {
    return <App config={config} />
  }
}
