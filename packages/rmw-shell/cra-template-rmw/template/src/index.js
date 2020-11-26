import React from 'react'
import { render } from 'react-dom'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
  onUpdate: (reg) => {
    window.update = () => {
      try {
        reg.waiting.postMessage({ type: 'SKIP_WAITING' })
        window.location.reload()
      } catch (error) {
        console.warn('error', error)
      }
    }
  },
})
