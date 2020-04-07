/* eslint-disable react/jsx-key */
import React, { lazy } from 'react'
import PrivateRoute from 'base-shell/lib/components/PrivateRoute/PrivateRoute'
import { Route } from 'react-router-dom'

const About = lazy(() => import('../pages/About/About'))
const Home = lazy(() => import('../pages/Home/Home'))

const routes = [
  <Route path="/about" exact component={About} />,
  <PrivateRoute path="/home" exact component={Home} />,
]

export default routes
