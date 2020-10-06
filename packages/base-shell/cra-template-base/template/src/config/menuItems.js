import allLocales from './locales'
// import allThemes from './themes'

const getMenuItems = (props) => {
  const { auth: authData, locale, updateLocale, intl } = props
  const { setAuth, auth } = authData

  const localeItems = allLocales.map((l) => {
    const result = {
      value: undefined,
      visible: true,
      key: l.locale,
      primaryText: intl.formatMessage({ id: l.locale }),
      onClick: () => {
        updateLocale(l.locale)
      },
    }
    return result
  })

  const handleSignOut = () => {
    setAuth({ isAuthenticated: false })
  }

  return [
    {
      value: '/signin',
      onClick: auth.isAuthenticated ? handleSignOut : () => {},
      visible: true,
      primaryText: auth.isAuthenticated
        ? intl.formatMessage({ id: 'sign_out' })
        : intl.formatMessage({ id: 'sign_in' }),
    },
    {
      value: '/home',
      visible: auth.isAuthenticated,
      primaryText: intl.formatMessage({ id: 'home' }),
    },
    {
      value: '/about',
      visible: true,
      primaryText: intl.formatMessage({ id: 'about' }),
    },
    {
      value: undefined,
      primaryText: intl.formatMessage({ id: 'settings' }),
      visible: true,
      nestedItems: [
        // {
        //   primaryText: intl.formatMessage({ id: 'theme' }),
        //   secondaryText: intl.formatMessage({ id: themeSource.source }),
        //   primaryTogglesNestedList: true,
        //   leftIcon: <StyleIcon />,
        //   nestedItems: themeItems,
        // },
        {
          value: undefined,
          primaryText: intl.formatMessage({ id: 'language' }),
          primaryTogglesNestedList: true,
          secondaryText: intl.formatMessage({ id: locale }),
          nestedItems: localeItems,
        },
      ],
    },
  ]
}

export default getMenuItems
