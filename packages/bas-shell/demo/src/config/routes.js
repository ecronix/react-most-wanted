/* eslint-disable react/jsx-key */
import React from 'react'
//import PrivateRoute from 'base-shell/lib/containers/PrivateRoute/PrivateRoute'
import { Route } from 'react-router-dom'
import loadAsync from 'base-shell/lib/utils/asyncLoad'

const AboutPage = loadAsync({
  loader: () => import('../pages/About/About'),
})

const routes = [<Route path="/about" exact component={AboutPage} />]

export default routes
