// import allLocales from './locales'
// import allThemes from './themes'

const getMenuItems = props => {
  const {
    auth,
    handleSignOut,
  } = props
  console.log('getMenuItems', props)
  const isAuthorised = auth.isAuthenticated();
  console.log('getMenuItems isAuthorised', isAuthorised)
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
