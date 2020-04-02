import React, { Component } from 'react'
import { render } from 'react-dom'
import App from 'base-shell/lib'

const LandingPage = () => {
  return <div>Landing Page</div>
}

const config = {
  landingPage: LandingPage,
}

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
