import React from 'react'
import { Route } from 'react-router-dom'
import loadAsync from '../../utils/asyncLoad'

const getDefaultRoutes = () => {
  const AsyncPageNotFound = loadAsync({
    loader: () => import('../../pages/PageNotFound/PageNotFound'),
  })

  return [
    <Route>
      <AsyncPageNotFound />
    </Route>,
  ]
}

export default getDefaultRoutes
