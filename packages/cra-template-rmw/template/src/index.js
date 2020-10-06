import * as serviceWorker from 'rmw-shell/lib/utils/serviceWorker'
import React from 'react'
import ReactDOM from 'react-dom'
import AppAsync from './App'

ReactDOM.render(<AppAsync />, document.getElementById('root'))

serviceWorker.register({})
