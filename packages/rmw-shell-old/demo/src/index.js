import React, { Component } from 'react'
import { render } from 'react-dom'
import configureStore from './store'
import * as serviceWorker from 'rmw-shell/lib/utils/serviceWorker'
import App from 'rmw-shell/lib'
import config from './config'
import A2HSProvider from 'a2hs'

class Demo extends Component {
  render() {
    return (
      <A2HSProvider>
        <App appConfig={{ configureStore, ...config }} />
      </A2HSProvider>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))

serviceWorker.register()
