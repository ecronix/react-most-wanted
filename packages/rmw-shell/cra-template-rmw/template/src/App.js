import React, { Component } from 'react'
import App from 'base-shell/lib'
import config from './config'

export default class Demo extends Component {
  render() {
    return <App config={config} />
  }
}
