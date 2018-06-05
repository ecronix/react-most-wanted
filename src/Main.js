import React, { Component } from 'react'
import configureStore from './store'
import { addLocalizationData } from 'rmw-shell/lib/locales'
import locales from './locales'
import App from 'rmw-shell'
import { Helmet } from 'react-helmet'
import config from './config'
import { withA2HS } from 'a2hs'

addLocalizationData(locales)

class Main extends Component {
  componentDidMount () {
    const { setA2HPState } = this.props
    console.log(this.props)
    // setA2HPState({ isAppInstallable: true })
  }

  render () {
    return <div>
      <Helmet>
        <link async type='text/css' rel='stylesheet' href='https://cdn.firebase.com/libs/firebaseui/3.0.0/firebaseui.css' />
        <link async rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
        <link async rel='stylesheet' href='index.css' />
      </Helmet>

      <App appConfig={{ configureStore, ...config }} />

    </div>
  }
}

export default withA2HS(Main)
