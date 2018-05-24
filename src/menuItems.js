import React from 'react'
import Icon from '@material-ui/core/Icon'
import allLocales from './locales'
import allThemes from './themes'

const getMenuItems = (props) => {
  const {
    locale,
    updateTheme,
    switchNightMode,
    updateLocale,
    intl,
    themeSource,
    auth,
    isGranted
  } = props

  const isAuthorised = auth.isAuthorised

  const themeItems = allThemes.map((t) => {
    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({ id: t.id }),
      onClick: () => { updateTheme(t.id) },
      leftIcon: <Icon style={{ color: t.color }} >style</Icon>
    }
  })

  const localeItems = allLocales.map((l) => {
    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({ id: l.locale }),
      onClick: () => { updateLocale(l.locale) },
      leftIcon: <Icon >language</Icon>
    }
  })

  return [
    {
      value: '/dashboard',
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'dashboard' }),
      leftIcon: <Icon className='material-icons' >dashboard</Icon>
    },
    {
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'chats' }),
      primaryTogglesNestedList: true,
      leftIcon: <Icon className='material-icons' >chats</Icon>,
      nestedItems: [
        {
          value: '/chats',
          visible: isAuthorised,
          primaryText: intl.formatMessage({ id: 'private' }),
          leftIcon: <Icon className='material-icons' >person</Icon>
        },
        {
          value: '/public_chats',
          visible: isAuthorised,
          primaryText: intl.formatMessage({ id: 'public' }),
          leftIcon: <Icon className='material-icons' >group</Icon>
        },
        {
          value: '/predefined_chat_messages',
          visible: isAuthorised,
          primaryText: intl.formatMessage({ id: 'predefined_messages' }),
          leftIcon: <Icon className='material-icons' >textsms</Icon>
        }
      ]
    },
    {
      value: '/companies',
      visible: isGranted('read_companies'),
      primaryText: intl.formatMessage({ id: 'companies' }),
      leftIcon: <Icon className='material-icons' >business</Icon>
    },
    {
      value: '/tasks',
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'tasks' }),
      leftIcon: <Icon className='material-icons' >list</Icon>
    },
    {
      visible: isAuthorised,
      primaryTogglesNestedList: true,
      primaryText: intl.formatMessage({ id: 'firestore' }),
      leftIcon: <Icon className='material-icons' >flash_on</Icon>,
      nestedItems: [
        {
          value: '/document',
          primaryText: intl.formatMessage({ id: 'document' }),
          leftIcon: <Icon className='material-icons' >flash_on</Icon>
        },
        {
          value: '/collection',
          primaryText: intl.formatMessage({ id: 'collection' }),
          leftIcon: <Icon className='material-icons' >flash_on</Icon>
        }
      ]
    },
    {
      value: '/about',
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'about' }),
      leftIcon: <Icon className='material-icons' >info_outline</Icon>
    },
    {
      visible: isAuthorised, // In prod: isGranted('administration'),
      primaryTogglesNestedList: true,
      primaryText: intl.formatMessage({ id: 'administration' }),
      leftIcon: <Icon className='material-icons' >security</Icon>,
      nestedItems: [
        {
          value: '/users',
          visible: isAuthorised, // In prod: isGranted('read_users'),
          primaryText: intl.formatMessage({ id: 'users' }),
          leftIcon: <Icon className='material-icons' >group</Icon>
        },
        {
          value: '/roles',
          visible: isGranted('read_roles'),
          primaryText: intl.formatMessage({ id: 'roles' }),
          leftIcon: <Icon className='material-icons' >account_box</Icon>
        }
      ]
    },
    {
      divider: true,
      visible: isAuthorised
    },
    {
      primaryText: intl.formatMessage({ id: 'settings' }),
      primaryTogglesNestedList: true,
      leftIcon: <Icon className='material-icons' >settings</Icon>,
      nestedItems: [
        {
          primaryText: intl.formatMessage({ id: 'theme' }),
          secondaryText: intl.formatMessage({ id: themeSource.source }),
          primaryTogglesNestedList: true,
          leftIcon: <Icon > style</Icon >,
          nestedItems: themeItems
        },
        {
          primaryText: intl.formatMessage({ id: 'language' }),
          secondaryText: intl.formatMessage({ id: locale }),
          primaryTogglesNestedList: true,
          leftIcon: <Icon className='material-icons' >language</Icon>,
          nestedItems: localeItems
        }
      ]
    },
    {
      onClick: () => {
        switchNightMode(!themeSource.isNightModeOn)
      },
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: themeSource.isNightModeOn ? 'day_mode' : 'night_mode' }),
      leftIcon: <Icon className='material-icons' >{themeSource.isNightModeOn ? 'brightness_7' : 'brightness_2'}</Icon>
    }
  ]
}

export default getMenuItems
