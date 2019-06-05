import App from 'rmw-shell'
import React from 'react'
import config from './config'
import configureStore from './store'
import locales from './config/locales'
import { addLocalizationData } from 'rmw-shell/lib/config/locales'

addLocalizationData(locales)

console.log('test2')

const Main = () => <App appConfig={{ configureStore, ...config }} />

export default Main
