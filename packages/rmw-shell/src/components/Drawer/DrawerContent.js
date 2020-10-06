import React from 'react'
import Scrollbar from '../../components/Scrollbar'
import SelectableMenuList from '../../containers/SelectableMenuList'
import { compose } from 'redux'
import { injectIntl } from 'react-intl'
import { withA2HS } from 'a2hs'
import { withAppConfigs } from '../../contexts/AppConfigProvider'
import { withRouter } from 'react-router-dom'
import { withTheme } from '@material-ui/core/styles'

export const DrawerContent = props => {
  const { appConfig, dialogs, match, messaging, drawer } = props

  const handleChange = (event, index) => {
    const { history, setDrawerMobileOpen } = props

    if (index !== undefined) {
      setDrawerMobileOpen(false)
    }

    if (index !== undefined && index !== Object(index)) {
      history.push(index)
    }
  }

  const handleSignOut = async () => {
    const { userLogout, setDialogIsOpen, appConfig, setDrawerOpen } = props

    await appConfig.firebaseLoad().then(async ({ firebaseApp }) => {
      await firebaseApp
        .database()
        .ref(`users/${firebaseApp.auth().currentUser.uid}/connections`)
        .remove()
      await firebaseApp
        .database()
        .ref(`users/${firebaseApp.auth().currentUser.uid}/notificationTokens/${messaging.token}`)
        .remove()
      await firebaseApp
        .database()
        .ref(`users/${firebaseApp.auth().currentUser.uid}/lastOnline`)
        .set(new Date())
      await firebaseApp
        .auth()
        .signOut()
        .then(() => {
          userLogout()
          setDrawerOpen(false)
          setDialogIsOpen('auth_menu', false)
        })
    })
  }

  const isAuthMenu = !!dialogs.auth_menu

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Scrollbar>
        {isAuthMenu && (
          <SelectableMenuList
            items={appConfig.getMenuItems({ ...props, isAuthMenu, handleSignOut })}
            onIndexChange={handleChange}
            index={match ? match.path : '/'}
            useMinified={drawer.useMinified && !drawer.open}
          />
        )}
        {!isAuthMenu && (
          <SelectableMenuList
            items={appConfig.getMenuItems({ ...props, isAuthMenu, handleSignOut })}
            onIndexChange={handleChange}
            index={match ? match.path : '/'}
            useMinified={drawer.useMinified && !drawer.open}
          />
        )}
      </Scrollbar>
    </div>
  )
}

export default compose(
  withA2HS,
  injectIntl,
  withRouter,
  withAppConfigs,
  withTheme
)(DrawerContent)
