// import allLocales from './locales'
// import allThemes from './themes'

const getMenuItems = props => {
  const {
    auth,
    handleSignOut,
    intl
  } = props

  const isAuthorised = auth.isAuthenticated();

  return [
    {
      value: '/signin',
      onClick: isAuthorised ? handleSignOut : () => { },
      visible: true,
      primaryText: isAuthorised ? intl.formatMessage({ id: 'sign_out' }) : intl.formatMessage({ id: 'sign_in' }),
    },
    {
      value: '/home',
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'home' }),
    },
    {
      value: '/about',
      visible: true,
      primaryText: intl.formatMessage({ id: 'about' }),
    },
  ]
}

export default getMenuItems
