import React from 'react'

const getDefaultRoutes = (appConfig) => {
  const { pages } = appConfig || {}
  const { PageNotFound = () => <div>Page not found</div> } = pages || {}

  return [{ path: '*', element: <PageNotFound /> }]
}

export default getDefaultRoutes
