import React, { lazy } from 'react'
import { Route } from 'react-router-dom'

const getDefaultRoutes = () => {
  const AsyncPageNotFound = lazy(() =>
    import('../../pages/PageNotFound/PageNotFound')
  )

  return [
    <Route>
      <AsyncPageNotFound />
    </Route>,
  ]
}

export default getDefaultRoutes
