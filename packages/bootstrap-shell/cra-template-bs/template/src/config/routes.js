/* eslint-disable react/jsx-key */
import React, { lazy } from 'react'
//import AuthorizedRoute from 'base-shell/lib/components/AuthorizedRoute'
//import UnauthorizedRoute from 'base-shell/lib/components/UnauthorizedRoute'

const Home = lazy(() => import('../pages/Home/Home'))
const routes = [
  {
    generateHeaderLink: true,
    displayName: 'Home',
    path: '/', // root path
    exact: true,
    element: <Home redirectTo="#home" />,
  },
  {
    generateHeaderLink: true,
    displayName: 'Second',
    path: '/home2', // path /home2
    exact: true,
    element: <Home redirectTo="#home" />,
  },
  {
    generateHeaderLink: true,
    displayName: 'Third',
    path: '*', //Page not found
    exact: true,
    element: <Home redirectTo="#home" />,
  },
]

export default routes
