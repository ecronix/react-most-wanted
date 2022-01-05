/* eslint-disable react/jsx-key */
import React, { lazy } from 'react'
// import UnauthorizedRoute from 'base-shell/lib/components/UnauthorizedRoute'

const ModalDemo = lazy(() => import('../pages/ModalDemo/ModalDemo'))


const routes = [
  {
    path: '/signin',
    exact: true,
    element: <ModalDemo redirectTo="/" />
    ,
  },
]

export default routes
