import React from 'react'
import { Route } from 'react-router-dom'

const getDefaultRoutes = (appConfig) => {
  const { pages } = appConfig || {}
  const { PageNotFound = () => <div>Page not found</div> } = pages || {}

  return [<Route component={PageNotFound} />]
}

export default getDefaultRoutes
