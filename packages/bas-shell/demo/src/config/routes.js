/* eslint-disable react/jsx-key */
import React, { lazy } from 'react'
//import PrivateRoute from 'base-shell/lib/containers/PrivateRoute/PrivateRoute'
import { Route } from 'react-router-dom'

const AboutPage = lazy(() => import('../pages/About/About'))

const routes = [<Route path="/about" exact component={AboutPage} />]

export default routes
