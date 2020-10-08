import Avatar from '@material-ui/core/Avatar'
import Camera from '@material-ui/icons/CameraAlt'
import Delete from '@material-ui/icons/Delete'
import Fab from '@material-ui/core/Fab'
import InputBase from '@material-ui/core/InputBase'
import NotificationsOff from '@material-ui/icons/NotificationsOff'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import Paper from '@material-ui/core/Paper'
import React, { useState } from 'react'
import Save from '@material-ui/icons/Save'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import { IconButton } from '@material-ui/core'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useConfig } from 'base-shell/lib/providers/Config'
import { useIntl } from 'react-intl'
import { useFirebase } from 'rmw-shell/lib/providers/Firebase'
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'
import ImgageUploadDialog from 'rmw-shell/lib/containers/ImageUploadDialog'
import {
  GoogleIcon,
  FacebookIcon,
  GitHubIcon,
  TwitterIcon,
} from 'rmw-shell/lib/components/Icons'
import firebase from 'firebase/app'

const uuid = () => {
  const url = URL.createObjectURL(new Blob())
  const [id] = url.toString().split('/').reverse()
  URL.revokeObjectURL(url)
  return id
}

const MyAccount = () => {
  const intl = useIntl()
  const { appConfig } = useConfig()
  const { firebaseApp } = useFirebase()
  const { firebase: firebaseConfig } = appConfig || {}
  const { firebaseuiProps } = firebaseConfig || {}
  const { signInOptions = [] } = firebaseuiProps || {}
  const { openDialog } = useQuestions()

  const { auth, setAuth } = useAuth()
  const {
    photoURL: currentPhoroURL = '',
    displayName: currentDisplayName = '',
    email = '',
  } = auth || {}
  const [displayName, setDisplayName] = useState(currentDisplayName)
  const [photoURL, setPhotoURL] = useState(currentPhoroURL)
  const [isImageDialogOpen, setImageDialogOpen] = useState(false)

  const hasChange =
    displayName !== currentDisplayName || photoURL !== currentPhoroURL

  const handleImageChange = (image) => {
    setPhotoURL(image)
  }

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

  const getProvider = (provider) => {
    if (provider.indexOf('facebook') > -1) {
      return new firebase.auth.FacebookAuthProvider()
    }
    if (provider.indexOf('github') > -1) {
      return new firebase.auth.GithubAuthProvider()
    }
    if (provider.indexOf('google') > -1) {
      return new firebase.auth.GoogleAuthProvider()
    }
    if (provider.indexOf('twitter') > -1) {
      return new firebase.auth.TwitterAuthProvider()
    }
    if (provider.indexOf('phone') > -1) {
      return new firebase.auth.PhoneAuthProvider()
    }

    throw new Error('Provider is not supported!')
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

  const linkUserWithPopup = (p) => {
    const provider = getProvider(p)

    firebaseApp
      .auth()
      .currentUser.linkWithPopup(provider)
      .then(
        () => {
          setAuth({ ...auth, ...firebaseApp.auth().currentUser })
        },
        (e) => {
          console.warn(e)
        }
      )
  }

  const openDeleteDialog = () => {
    openDialog({
      title: intl.formatMessage({
        id: 'delete_account_dialog_title',
        defaultMessage: 'Delete Account?',
      }),
      message: intl.formatMessage({
        id: 'delete_account_dialog_message',
        defaultMessage:
          'This Account and all related data to it will be deleted permanently. Do you want to proceed with the deletion?',
      }),
      action: intl.formatMessage({
        id: 'delete_account_dialog_action',
        defaultMessage: 'DELETE ACCOUNT',
      }),
      handleAction: handleDelete,
    })
  }

  const openReauthenticateDialog = () => {
    openDialog({
      title: intl.formatMessage({
        id: 'reauthenticate_account_dialog_title',
        defaultMessage: 'Reauthentication required',
      }),
      message: intl.formatMessage({
        id: 'reauthenticate_account_dialog_message',
        defaultMessage:
          'To ensure that you are the real owner of this account a reauthentication is required. For that you need to logout and login into the application. By pressing the REAUTHENTICATION button you will be logged out automaticaly. After you login afain you can delete your account!',
      }),
      action: intl.formatMessage({
        id: 'reauthenticate_account_dialog_action',
        defaultMessage: 'REAUTHENTICATE',
      }),
      handleAction: (hc) => {
        firebaseApp.auth().signOut()
        hc()
      },
    })
  }

  const handleDelete = async (handleClose) => {
    try {
      await firebaseApp.auth().currentUser.delete()
    } catch ({ code }) {
      if (code === 'auth/requires-recent-login') {
        openReauthenticateDialog()
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
            onClick={openDeleteDialog}
            color="secondary"
            aria-label="delete"
          >
            <Delete />
          </Fab>

          <Fab
            onClick={() => setImageDialogOpen(true)}
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
                  fontSize: 26,
                  fontWeight: 'bold',
                  textAlign: 'center',
                },
              }}
            />

            <Typography variant="h6">{email}</Typography>
            <div style={{ margin: 18, display: 'flex', alignItems: 'center' }}>
              {signInOptions.map((so) => {
                return getProviderIcon(so) ? (
                  <IconButton
                    disabled={isLinkedWithProvider(so)}
                    color="primary"
                    key={so}
                    onClick={() => linkUserWithPopup(so)}
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

        <ImgageUploadDialog
          isOpen={isImageDialogOpen}
          handleClose={() => setImageDialogOpen(false)}
          handleCropSubmit={handleImageChange}
          path={`users/${auth.uid}/${uuid()}.jpeg`}
        />
      </div>
    </Page>
  )
}

export default MyAccount
