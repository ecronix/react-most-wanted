import React, { lazy } from 'react'
import { Route } from 'react-router-dom'
import PublicRoute from 'base-shell/lib/components/PublicRoute/PublicRoute'

const SignIn = lazy(() => import('../pages/SignIn/SignIn'))

const getDefaultRoutes = (appConfig) => {
  const { pages } = appConfig || {}
  const { PageNotFound = () => <div>Page not found</div> } = pages || {}

  return [
    <PublicRoute path="/signin" redirectTo="/home" exact component={SignIn} />,
    <Route component={PageNotFound} />,
  ]
}

export default getDefaultRoutes
