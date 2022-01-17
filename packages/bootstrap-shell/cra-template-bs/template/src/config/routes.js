/* eslint-disable react/jsx-key */
import React, { lazy } from 'react'
//import AuthorizedRoute from 'base-shell/lib/components/AuthorizedRoute'
//import UnauthorizedRoute from 'base-shell/lib/components/UnauthorizedRoute'

const Home = lazy(() => import('../pages/Home/Home'))
const Dialog = lazy(() => import('../pages/DialogDemo'))
const routes = [
  {
    path: '/home', // root path
    exact: true,
    element: <Home />,
  },
  {
    path: '/dialog', // path /home2
    exact: true,
    element: <Dialog redirectTo="/dialog" />,
  },
  {
    path: '*', //Page not found
    exact: true,
    element: <Home redirectTo="#home" />,
  },
]

export default routes
