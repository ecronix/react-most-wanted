import allLocales from './locales'
// import allThemes from './themes'
import React from 'react'
import DaschboardIcon from '@material-ui/icons/Dashboard'
import InfoOutlined from '@material-ui/icons/InfoOutlined'
import LockIcon from '@material-ui/icons/Lock'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logout } from '../utils/auth'
import LanguageIcon from '@material-ui/icons/Language'
import SettingsIcon from '@material-ui/icons/SettingsApplications'
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import ChromeReaderMode from '@material-ui/icons/ChromeReaderMode'

const getMenuItems = props => {
  const {
    auth,
    intl,
    updateLocale,
    locale,
    switchMenuMiniMode,
    useMenuMiniMode
  } = props


  const localeItems = allLocales.map(l => {
    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({ id: l.locale }),
      onClick: () => {
        updateLocale(l.locale)
      },
      leftIcon: <LanguageIcon />
    }
  })

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
    {
      primaryText: intl.formatMessage({ id: 'settings' }),
      primaryTogglesNestedList: true,
      leftIcon: <SettingsIcon />,
      nestedItems: [
        {
          primaryText: intl.formatMessage({ id: 'language' }),
          secondaryText: intl.formatMessage({ id: locale }),
          primaryTogglesNestedList: true,
          leftIcon: <LanguageIcon />,
          nestedItems: localeItems
        },
        {
          onClick: () => {
            switchMenuMiniMode(!useMenuMiniMode)
          },
          primaryText: intl.formatMessage({
            id: 'menu_mini_mode',
          }),
          leftIcon: useMenuMiniMode ? <MenuOpenIcon /> : <ChromeReaderMode />,
        },
      ]
    },
  ]
}

export default getMenuItems
