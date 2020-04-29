// import allLocales from './locales'
// import allThemes from './themes'
import React from 'react'
import DaschboardIcon from '@material-ui/icons/Dashboard'
import InfoOutlined from '@material-ui/icons/InfoOutlined'
import LockIcon from '@material-ui/icons/Lock'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logout } from '../utils/auth'

const getMenuItems = props => {
  const {
    auth,
    intl
  } = props

  const isAuthorised = auth.isAuthenticated();

  return [
    {
      value: '/signin',
      onClick: isAuthorised ? logout : () => { },
      visible: true,
      primaryText: isAuthorised ? intl.formatMessage({ id: 'sign_out' }) : intl.formatMessage({ id: 'sign_in' }),
      leftIcon: isAuthorised ? <ExitToAppIcon /> : <LockIcon />,
    },
    {
      value: '/home',
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'home' }),
      leftIcon: <DaschboardIcon />,
    },
    {
      value: '/about',
      visible: true,
      primaryText: intl.formatMessage({ id: 'about' }),
      leftIcon: <InfoOutlined />,
    },
  ]
}

export default getMenuItems
