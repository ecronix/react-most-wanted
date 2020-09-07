import Avatar from '@material-ui/core/Avatar'
import Camera from '@material-ui/icons/CameraAlt'
import Delete from '@material-ui/icons/Delete'
import Fab from '@material-ui/core/Fab'
import InputBase from '@material-ui/core/InputBase'
import Notifications from '@material-ui/icons/Notifications'
import NotificationsOff from '@material-ui/icons/NotificationsOff'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import Paper from '@material-ui/core/Paper'
import QuestionDialog from 'material-ui-shell/lib/containers/QuestionDialog/QuestionDialog'
import React, { useContext, useState } from 'react'
import Save from '@material-ui/icons/Save'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import { IconButton } from '@material-ui/core'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useConfig } from 'base-shell/lib/providers/Config'
import { useIntl } from 'react-intl'
import { useFirebase } from 'rmw-shell/lib/providers/Firebase'
import { useSimpleValues } from 'base-shell/lib/providers/SimpleValues'
import {
  GoogleIcon,
  FacebookIcon,
  GitHubIcon,
  TwitterIcon,
} from 'rmw-shell/lib/components/Icons'

const DELETE_DIALOG_ID = 'delete_account_dialog'
const REAUTHENTICATE_DIALOG_ID = 'reauthenticate_account_dialog'

const MyAccount = () => {
  const intl = useIntl()
  const { appConfig } = useConfig()
  const { firebaseApp } = useFirebase()
  const { setValue } = useSimpleValues()
  const { firebase } = appConfig || {}
  const { firebaseuiProps } = firebase || {}
  const { signInOptions = [] } = firebaseuiProps || {}

  const { auth, setAuth } = useAuth()
  const { photoURL = '', displayName: currentDisplayName = '', email = '' } =
    auth || {}
  const [displayName, setDisplayName] = useState(currentDisplayName)

  const hasChange = displayName !== currentDisplayName

  const getProviderIcon = (id) => {
    if (id === 'google.com') {
      return <GoogleIcon />
    }
    if (id === 'facebook.com') {
      return <FacebookIcon />
    }
    if (id === 'github.com') {
      return <GitHubIcon />
    }
    if (id === 'twitter.com') {
      return <TwitterIcon />
    }

    return null
  }

  const handleSave = async () => {
    await firebaseApp
      .auth()
      .currentUser.updateProfile({ displayName, photoURL })

    setAuth({ ...auth, displayName, photoURL })
  }

  const isLinkedWithProvider = (provider) => {
    try {
      return (
        auth &&
        auth.providerData &&
        auth.providerData.find((p) => {
          return p.providerId === provider
        }) !== undefined
      )
    } catch (e) {
      return false
    }
  }

  const handleDelete = async (handleClose) => {
    setValue(DELETE_DIALOG_ID, false)
    setValue(REAUTHENTICATE_DIALOG_ID, true)
    return
    try {
      await firebaseApp.auth().currentUser.delete()
    } catch ({ code }) {
      if (code === 'auth/requires-recent-login') {
        setValue(DELETE_DIALOG_ID, false)
        setValue(REAUTHENTICATE_DIALOG_ID, true)
      }
    }

    handleClose()
  }

  return (
    <Page
      pageTitle={intl.formatMessage({
        id: 'my_account',
        defaultMessage: 'My Account',
      })}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Paper
          elevation={3}
          style={{
            position: 'relative',
            //width: 300,
            //height: 300,
            borderRadius: 18,
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Fab
            size="medium"
            style={{
              position: 'absolute',
              top: 30,
              right: -16,
            }}
            onClick={handleSave}
            color="primary"
            aria-label="notifications"
          >
            <NotificationsOff />
          </Fab>
          <Fab
            size="medium"
            style={{ position: 'absolute', bottom: 40, right: -16 }}
            onClick={() => setValue(DELETE_DIALOG_ID, true)}
            color="secondary"
            aria-label="delete"
          >
            <Delete />
          </Fab>

          <Fab
            //onClick={handleSave}
            style={{
              position: 'absolute',
              zIndex: 99,
              top: 50,
              marginRight: -60,
            }}
            color="primary"
            aria-label="save"
            size="small"
          >
            <Camera />
          </Fab>
          <Avatar
            style={{ width: 120, height: 120, marginTop: -40 }}
            alt="User Picture"
            src={photoURL}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              marginTop: 18,
              marginBottom: 18,
            }}
          >
            <InputBase
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              inputProps={{
                'aria-label': 'naked',
                style: {
                  fontSize: 25,
                  fontWeight: 400,
                  textAlign: 'center',
                },
              }}
            />

            <Typography variant="subtitle1">{email}</Typography>
            <div style={{ margin: 18, display: 'flex', alignItems: 'center' }}>
              {signInOptions.map((so) => {
                return getProviderIcon(so) ? (
                  <IconButton
                    disabled={isLinkedWithProvider(so)}
                    color="primary"
                    key={so}
                  >
                    {getProviderIcon(so)}
                  </IconButton>
                ) : null
              })}
            </div>
          </div>
          <Zoom in={hasChange}>
            <Fab
              onClick={handleSave}
              style={{ marginBottom: -20 }}
              color="primary"
              aria-label="save"
            >
              <Save />
            </Fab>
          </Zoom>
        </Paper>

        <QuestionDialog
          id={DELETE_DIALOG_ID}
          title={intl.formatMessage({
            id: 'delete_account_dialog_title',
            defaultMessage: 'Delete Account?',
          })}
          message={intl.formatMessage({
            id: 'delete_account_dialog_message',
            defaultMessage:
              'This Account and all related data to it will be deleted permanently. Do you want to proceed with the deletion?',
          })}
          action={intl.formatMessage({
            id: 'delete_account_dialog_action',
            defaultMessage: 'DELETE ACCOUNT',
          })}
          handleAction={handleDelete}
        />
        <QuestionDialog
          id={REAUTHENTICATE_DIALOG_ID}
          title={intl.formatMessage({
            id: 'reauthenticate_account_dialog_title',
            defaultMessage: 'Reauthentication required',
          })}
          message={intl.formatMessage({
            id: 'reauthenticate_account_dialog_message',
            defaultMessage:
              'To ensure that you are the real owner of this account a reauthentication is required. For that you need to logout and login into the application. By pressing the REAUTHENTICATION button you will be logged out automaticaly. After you login afain you can delete your account!',
          })}
          action={intl.formatMessage({
            id: 'reauthenticate_account_dialog_action',
            defaultMessage: 'REAUTHENTICATE',
          })}
          handleAction={(hc) => {
            firebaseApp.auth().signOut()
            hc()
          }}
        />
      </div>
    </Page>
  )
}

export default MyAccount
