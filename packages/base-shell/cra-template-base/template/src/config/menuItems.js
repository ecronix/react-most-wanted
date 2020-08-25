import allLocales from './locales'
// import allThemes from './themes'

const getMenuItems = (props) => {
  const { auth, locale, updateLocale, intl } = props
  const { isAuthenticated, setAuth, setIsAuthenticated } = auth

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
    setIsAuthenticated(false)
    setAuth(null)
  }

  return [
    {
      value: '/signin',
      onClick: isAuthenticated ? handleSignOut : () => {},
      visible: true,
      primaryText: isAuthenticated
        ? intl.formatMessage({ id: 'sign_out' })
        : intl.formatMessage({ id: 'sign_in' }),
    },
    {
      value: '/home',
      visible: isAuthenticated,
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
