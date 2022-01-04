import React, { Component } from 'react'
import App from 'base-shell/lib'
import _config from './config'

export default class Demo extends Component {
  render() {
    return <App config={_config} />
  }
}
