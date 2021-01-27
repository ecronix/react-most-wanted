import AccountBoxIcon from '@material-ui/icons/AccountBox'
import Assignment from '@material-ui/icons/Assignment'
import Business from '@material-ui/icons/Business'
import ChromeReaderMode from '@material-ui/icons/ChromeReaderMode'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Web from '@material-ui/icons/Web'
import GetApp from '@material-ui/icons/GetApp'
import InfoOutlined from '@material-ui/icons/InfoOutlined'
import LanguageIcon from '@material-ui/icons/Language'
import LockIcon from '@material-ui/icons/Lock'
import MenuOpenIcon from '@material-ui/icons/MenuOpen'
import People from '@material-ui/icons/People'
import React from 'react'
import Security from '@material-ui/icons/Security'
import SettingsIcon from '@material-ui/icons/SettingsApplications'
import Slideshow from '@material-ui/icons/Slideshow'
import StyleIcon from '@material-ui/icons/Style'
import CallToAction from '@material-ui/icons/CallToAction'
import Whatshot from '@material-ui/icons/Whatshot'
import Chat from '@material-ui/icons/Chat'
import allLocales from './locales'
import allThemes from './themes'

const getMenuItems = (props) => {
  const {
    intl,
    updateLocale,
    locale,
    menuContext,
    themeContext,
    a2HSContext,
    firebaseApp,
    auth: authData,
  } = props
  const {
    isDesktop,
    isAuthMenuOpen,
    dispatch,
    menuStore = {},
    // useMiniMode,
    // setMiniMode,
    setAuthMenuOpen,
    setMiniSwitchVisibility,
  } = menuContext
  const { themeID = 'en', setThemeID } = themeContext || {}
  const { isAppInstallable, isAppInstalled, deferredPrompt } = a2HSContext || {}
  const { auth } = authData
  const { isGranted = () => false, isAdmin = false } = auth || {}

  const localeItems = allLocales.map((l) => {
    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({ id: l.locale }),
      onClick: () => {
        updateLocale(l.locale)
        if (!isAuthorised) {
          try {
            window.location.reload()
          } catch (error) {}
        }
      },
      leftIcon: <LanguageIcon />,
    }
  })

  const isAuthorised = auth.isAuthenticated

  const themeItems = allThemes.map((t) => {
    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({ id: t.id }),
      onClick: () => {
        setThemeID(t.id)
      },
      leftIcon: <StyleIcon style={{ color: t.color }} />,
    }
  })

  const handleSignOut = () => {
    setAuthMenuOpen(false)
    firebaseApp.auth().signOut()
    localStorage.clear()
  }

  if (isAuthMenuOpen) {
    return [
      {
        value: '/my_account',
        primaryText: intl.formatMessage({
          id: 'my_account',
          defaultMessage: 'My Account',
        }),
        leftIcon: <AccountBoxIcon />,
      },
      {
        value: '/signin',
        onClick: isAuthorised ? () => handleSignOut() : () => {},
        visible: true,
        primaryText: isAuthorised
          ? intl.formatMessage({ id: 'sign_out' })
          : intl.formatMessage({ id: 'sign_in' }),
        leftIcon: isAuthorised ? <ExitToAppIcon /> : <LockIcon />,
      },
    ]
  }
  return [
    {
      value: '/signin',
      onClick: isAuthorised ? () => handleSignOut() : () => {},
      visible: !isAuthorised,
      primaryText: isAuthorised
        ? intl.formatMessage({ id: 'sign_out' })
        : intl.formatMessage({ id: 'sign_in' }),
      leftIcon: isAuthorised ? <ExitToAppIcon /> : <LockIcon />,
    },
    {
      value: '/',
      visible: isAuthorised,
      primaryText: intl.formatMessage({
        id: 'landing_page',
        defaultMessage: 'Landing Page',
      }),
      leftIcon: <Web />,
    },
    {
      value: '/dashboard',
      visible: isAuthorised,
      primaryText: intl.formatMessage({
        id: 'dashboard',
        defaultMessage: 'Dashboard',
      }),
      leftIcon: <DashboardIcon />,
    },
    {
      value: '/about',
      visible: true,
      primaryText: intl.formatMessage({ id: 'about', defaultMessage: 'About' }),
      leftIcon: <InfoOutlined />,
    },
    {
      value: '/chats',
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'chats', defaultMessage: 'Chats' }),
      leftIcon: <Chat />,
    },
    {
      primaryText: intl.formatMessage({
        id: 'demos',
        defaultMessage: 'Demos',
      }),
      visible: isAuthorised,
      primaryTogglesNestedList: true,
      leftIcon: <Slideshow />,
      nestedItems: [
        {
          value: '/admin',
          visible: !isAdmin,
          primaryText: intl.formatMessage({
            id: 'admin',
            defaultMessage: 'Admin',
          }),
          leftIcon: <Security />,
        },
        {
          value: '/companies',
          visible: isGranted(auth, 'read_companies'),
          primaryText: intl.formatMessage({
            id: 'companies',
            defaultMessage: 'Companies',
          }),
          leftIcon: <Business />,
        },
        {
          value: '/tasks',
          visible: isAuthorised,
          primaryText: intl.formatMessage({
            id: 'tasks',
            defaultMessage: 'Tasks',
          }),
          leftIcon: <Assignment />,
        },
        {
          value: '/posts',
          visible: isAuthorised,
          primaryText: intl.formatMessage({
            id: 'posts',
            defaultMessage: 'Posts',
          }),
          leftIcon: <CallToAction />,
        },
      ],
    },
    {
      primaryText: intl.formatMessage({
        id: 'documentation',
        defaultMessage: 'Documentation',
      }),
      visible: isAuthorised,
      primaryTogglesNestedList: true,
      leftIcon: <Assignment />,
      nestedItems: [
        {
          value: '/docu/getting_started',
          visible: isAuthorised,
          primaryText: intl.formatMessage({
            id: 'getting_started',
            defaultMessage: 'Getting started',
          }),
          leftIcon: <Assignment />,
        },
      ],
    },

    {
      primaryText: intl.formatMessage({
        id: 'firebase',
        defaultMessage: 'Firebase',
      }),
      visible: isAuthorised,
      primaryTogglesNestedList: true,
      leftIcon: <Whatshot />,
      nestedItems: [
        {
          value: '/firebase_paths',
          visible: isAuthorised,
          primaryText: intl.formatMessage({
            id: 'firebase_paths',
            defaultMessage: 'Paths',
          }),
          leftIcon: <Whatshot />,
        },
        {
          value: '/firebase_lists',
          visible: isAuthorised,
          primaryText: intl.formatMessage({
            id: 'firebase_lists',
            defaultMessage: 'Lists',
          }),
          leftIcon: <Whatshot />,
        },
        {
          value: '/firebase_docs',
          visible: isAuthorised,
          primaryText: intl.formatMessage({
            id: 'firebase_docs',
            defaultMessage: 'Docs',
          }),
          leftIcon: <Whatshot />,
        },
        {
          value: '/firebase_cols',
          visible: isAuthorised,
          primaryText: intl.formatMessage({
            id: 'firebase_cols',
            defaultMessage: 'Cols',
          }),
          leftIcon: <Whatshot />,
        },
        {
          value: '/firebase_messaging',
          visible: isAuthorised,
          primaryText: intl.formatMessage({
            id: 'firebase_messaging',
            defaultMessage: 'Messaging',
          }),
          leftIcon: <Whatshot />,
        },
        {
          value: '/firebase_storage',
          visible: isAuthorised,
          primaryText: intl.formatMessage({
            id: 'firebase_storage',
            defaultMessage: 'Storage',
          }),
          leftIcon: <Whatshot />,
        },
      ],
    },

    {
      primaryText: intl.formatMessage({
        id: 'administration',
        defaultMessage: 'Administration',
      }),
      primaryTogglesNestedList: true,
      visible: isAdmin,
      leftIcon: <Security />,
      nestedItems: [
        {
          value: '/users',
          visible: isAuthorised,
          primaryText: intl.formatMessage({
            id: 'users',
            defaultMessage: 'Users',
          }),
          leftIcon: <People />,
        },
        {
          value: '/roles',
          visible: isAuthorised,
          primaryText: intl.formatMessage({
            id: 'roles',
            defaultMessage: 'Roles',
          }),
          leftIcon: <AccountBoxIcon />,
        },
      ],
    },
    { divider: true },
    {
      visible: true,
      primaryText: intl.formatMessage({ id: 'settings' }),
      primaryTogglesNestedList: true,
      leftIcon: <SettingsIcon />,
      nestedItems: [
        {
          visible: true,
          primaryText: intl.formatMessage({ id: 'theme' }),
          secondaryText: intl.formatMessage({ id: themeID }),
          primaryTogglesNestedList: true,
          leftIcon: <StyleIcon />,
          nestedItems: themeItems,
        },
        {
          visible: true,
          primaryText: intl.formatMessage({ id: 'language' }),
          secondaryText: intl.formatMessage({ id: locale }),
          primaryTogglesNestedList: true,
          leftIcon: <LanguageIcon />,
          nestedItems: localeItems,
        },
        {
          visible: isDesktop ? true : false,
          onClick: () => {
            setMiniSwitchVisibility(dispatch, !menuStore.miniSwitchVisibility)
            console.log('this is somewhere else')
          },
          primaryText: intl.formatMessage({
            id: 'menu_mini_mode',
          }),
          leftIcon: menuStore.miniSwitchVisibility ? (
            <MenuOpenIcon />
          ) : (
            <ChromeReaderMode />
          ),
        },
      ],
    },
    {
      visible: isAppInstallable && !isAppInstalled,
      onClick: () => {
        deferredPrompt.prompt && deferredPrompt.prompt()
      },
      primaryText: intl.formatMessage({
        id: 'install',
        defaultMessage: 'Install',
      }),
      leftIcon: <GetApp />,
    },
  ]
}
export default getMenuItems
