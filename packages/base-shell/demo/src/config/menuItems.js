// import allLocales from './locales'
// import allThemes from './themes'

const getMenuItems = props => {
  const {
    auth,
    handleSignOut,
  } = props

  const isAuthorised = auth.isAuthenticated();

  return [
    {
      value: '/signin',
      onClick:isAuthorised ? handleSignOut : ()=>{},
      visible: true,
      primaryText: isAuthorised ? 'sign out' : 'sign in',
    },
    {
      value: '/home',
      visible: isAuthorised,
      primaryText: 'home',
    },
    {
      value: '/about',
      visible: true,
      primaryText: 'about',
    },
  ]
}

export default getMenuItems
