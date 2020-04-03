import React, { Component } from 'react'
import { render } from 'react-dom'
import App from 'base-shell/lib'
import config from './config'

export default class Demo extends Component {
  render() {
    return (
      <div>
        <h1>base-shell Demo</h1>
        <App config={config} />
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
