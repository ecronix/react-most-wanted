import Page from 'material-ui-shell/lib/containers/Page/Page'
import Avatar from '@material-ui/core/Avatar'
import Delete from '@material-ui/icons/Delete'
import Error from '@material-ui/icons/Error'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import Person from '@material-ui/icons/Person'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import PropTypes from 'prop-types'
//import QuestionDialog from '../../containers/QuestionDialog'
import React, { Component } from 'react'
import Save from '@material-ui/icons/Save'
import Switch from '@material-ui/core/Switch'
import VerifiedUser from '@material-ui/icons/VerifiedUser'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
//import requestNotificationPermission from '../../utils/messaging'
import {
  GoogleIcon,
  FacebookIcon,
  GitHubIcon,
  TwitterIcon,
} from '../../components/Icons'
//import { ImageCropDialog } from '../../containers/ImageCropDialog'
import { change, submit, formValueSelector } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getList, getPath } from 'firekit'
import { injectIntl } from 'react-intl'
//import { setDialogIsOpen } from '../../store/dialogs/actions'
//import { setPersistentValue } from '../../store/persistentValues/actions'
//import { setSimpleValue } from '../../store/simpleValues/actions'
import withConfig from 'base-shell/lib/providers/Config/withConfig'
import withFirebase from '../../providers/Firebase/withFirebase'
import { withRouter } from 'react-router-dom'
import { withTheme, withStyles } from '@material-ui/core/styles'

const form_name = 'my_account'

const styles = (theme) => ({
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 120,
    height: 120,
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(1) * 3,
  },
  textField: {},
})

export class MyAccount extends Component {
  state = {
    values: {
      displayName: '',
      email: '',
      photoURL: '',
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
    errors: {},
    isPhotoDialogOpen: false,
  }

  getProviderIcon = (p) => {
    switch (p) {
      case 'google.com':
        return <GoogleIcon />

      case 'facebook.com':
        return <FacebookIcon />

      case 'twitter.com':
        return <TwitterIcon />

      case 'github.com':
        return <GitHubIcon />

      default:
        return undefined
    }
  }

  handleEmailVerificationsSend = () => {
    const { firebaseApp } = this.props
    firebaseApp
      .auth()
      .currentUser.sendEmailVerification()
      .then(() => {
        alert('Verification E-Mail send')
      })
  }

  handlePhotoUploadSuccess = (snapshot) => {
    snapshot.ref.getDownloadURL().then((downloadURL) => {
      this.setState(
        { values: { ...this.state.values, photoURL: downloadURL } },
        () => {
          this.setState({ isPhotoDialogOpen: false })
        }
      )
    })
  }

  handleValueChange = (name, value) => {
    return this.setState(
      { values: { ...this.state.values, [name]: value } },
      () => {
        this.validate()
      }
    )
  }

  getProvider = (firebase, provider) => {
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

  reauthenticateUser = (values, onSuccess) => {
    const { auth, firebaseApp, authError } = this.props

    import('firebase').then((firebase) => {
      if (this.isLinkedWithProvider('password') && !values) {
        if (onSuccess && onSuccess instanceof Function) {
          onSuccess()
        }
      } else if (this.isLinkedWithProvider('password') && values) {
        const credential = firebase.auth.EmailAuthProvider.credential(
          auth.email,
          values.password
        )
        firebaseApp
          .auth()
          .currentUser.reauthenticateWithCredential(credential)
          .then(
            () => {
              if (onSuccess && onSuccess instanceof Function) {
                onSuccess()
              }
            },
            (e) => {
              authError(e)
            }
          )
      } else {
        firebaseApp
          .auth()
          .currentUser.reauthenticateWithPopup(
            this.getProvider(firebase, auth.providerData[0].providerId)
          )
          .then(
            () => {
              if (onSuccess && onSuccess instanceof Function) {
                onSuccess()
              }
            },
            (e) => {
              authError(e)
            }
          )
      }
    })
  }

  isLinkedWithProvider = (provider) => {
    const { auth } = this.props

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

  linkUserWithPopup = (p) => {
    const { firebaseApp, authError, authStateChanged } = this.props

    import('firebase').then((firebase) => {
      const provider = this.getProvider(firebase, p)

      firebaseApp
        .auth()
        .currentUser.linkWithPopup(provider)
        .then(
          () => {
            authStateChanged(firebaseApp.auth().currentUser)
          },
          (e) => {
            authError(e)
          }
        )
    })
  }

  handleCreateValues = () => {
    return false
  }

  clean = (obj) => {
    Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key])
    return obj
  }

  submit = () => {
    const { auth, firebaseApp, authStateChanged, authError } = this.props

    const values = this.state.values

    const simpleChange =
      (values.displayName &&
        values.displayName.localeCompare(auth.displayName)) ||
      (values.photoURL && values.photoURL.localeCompare(auth.photoURL))

    let simpleValues = {
      displayName: values.displayName,
      photoURL: values.photoURL,
    }

    //Change simple data
    if (simpleChange) {
      firebaseApp
        .auth()
        .currentUser.updateProfile(simpleValues)
        .then(
          () => {
            firebaseApp
              .database()
              .ref(`users/${auth.uid}`)
              .update(this.clean(simpleValues))
              .then(
                () => {
                  authStateChanged(values)
                },
                (e) => {
                  authError(e)
                }
              )
          },
          (e) => {
            authError(e)
          }
        )
    }

    //Change email
    if (values.email && values.email.localeCompare(auth.email)) {
      this.reauthenticateUser(values, () => {
        firebaseApp
          .auth()
          .currentUser.updateEmail(values.email)
          .then(
            () => {
              firebaseApp
                .database()
                .ref(`users/${auth.uid}`)
                .update({ email: values.email })
                .then(
                  () => {
                    authStateChanged({ email: values.email })
                  },
                  (e) => {
                    authError(e)
                  }
                )
            },
            (e) => {
              authError(e)

              if (e.code === 'auth/requires-recent-login') {
                firebaseApp
                  .auth()
                  .signOut()
                  .then(function () {
                    setTimeout(() => {
                      alert('Please sign in again to change your email.')
                    }, 1)
                  })
              }
            }
          )
      })
    }

    //Change password
    if (values.newPassword) {
      this.reauthenticateUser(values, () => {
        firebaseApp
          .auth()
          .currentUser.updatePassword(values.newPassword)
          .then(
            () => {
              firebaseApp.auth().signOut()
            },
            (e) => {
              authError(e)

              if (e.code === 'auth/requires-recent-login') {
                firebaseApp
                  .auth()
                  .signOut()
                  .then(() => {
                    setTimeout(() => {
                      alert('Please sign in again to change your password.')
                    }, 1)
                  })
              }
            }
          )
      })
    }

    //setSimpleValue('new_user_photo', undefined);

    // We manage the data saving above
    return false
  }

  handleClose = () => {
    const { setSimpleValue, setDialogIsOpen } = this.props
    setSimpleValue('delete_user', false)
    setDialogIsOpen('auth_menu', false)
  }

  handleNotificationsClose = () => {
    const { setSimpleValue } = this.props
    setSimpleValue('disable_notifications', false)
  }

  handleDelete = () => {
    const { firebaseApp, authError } = this.props

    this.reauthenticateUser(false, () => {
      firebaseApp
        .auth()
        .currentUser.delete()
        .then(
          () => {
            this.handleClose()
          },
          (e) => {
            authError(e)

            if (e.code === 'auth/requires-recent-login') {
              firebaseApp
                .auth()
                .signOut()
                .then(() => {
                  setTimeout(() => {
                    alert('Please sign in again to delete your account.')
                  }, 1)
                })
            }
          }
        )
    })
  }

  validate = () => {
    const { auth } = this.props
    const providerId = auth.providerData[0].providerId
    const errors = {}
    const values = this.state.values

    if (!values.displayName) {
      errors.displayName = 'Required'
    }

    if (!values.email) {
      errors.email = 'Required'
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address'
    } else if (
      !values.password &&
      providerId === 'password' &&
      auth.email.localeCompare(values.email)
    ) {
      errors.password = 'For email change enter your password'
    }

    if (values.newPassword) {
      if (values.newPassword.length < 6) {
        errors.newPassword = 'Password should be at least 6 characters'
      } else if (values.newPassword.localeCompare(values.confirmPassword)) {
        errors.newPassword = 'Must be equal'
        errors.confirmPassword = 'Must be equal'
      }

      if (!values.password) {
        errors.password = 'Required'
      }
    }

    this.setState({ errors })
  }

  canSave = () => {
    const { auth } = this.props
    const values = this.state.values

    if (Object.keys(this.state.errors).length) {
      return false
    }

    if (
      values.displayName !== auth.displayName ||
      values.email !== auth.email ||
      values.photoURL !== auth.photoURL
    ) {
      return true
    }

    if (values.newPassword) {
      return true
    }

    return false
  }

  componentDidMount() {
    const { auth, watchList, watchPath } = this.props
    const { displayName, email, photoURL } = auth

    watchList(`notification_tokens/${auth.uid}`)
    watchPath(`email_notifications/${auth.uid}`)
    this.setState({
      values: { ...this.state.values, displayName, email, photoURL },
    })
  }

  handleDisableNotifications = () => {
    const { firebaseApp, auth, setSimpleValue } = this.props

    firebaseApp
      .database()
      .ref(`disable_notifications/${auth.uid}`)
      .set(true)
      .then(() => {
        firebaseApp
          .database()
          .ref(`notification_tokens/${auth.uid}`)
          .remove()
          .then(() => {
            setSimpleValue('disable_notifications', false)
          })
      })
  }

  handleEnableNotificationsChange = (e) => {
    const { firebaseApp, auth, setSimpleValue } = this.props

    if (!e.target.checked) {
      setSimpleValue('disable_notifications', true)
    } else {
      firebaseApp
        .database()
        .ref(`disable_notifications/${auth.uid}`)
        .remove(() => {
          //requestNotificationPermission(this.props)
          // eslint-disable-next-line no-self-assign
          window.location.href = window.location.href
        })
    }
  }

  handleEmailNotification = async (e) => {
    const { firebaseApp, auth } = this.props
    await firebaseApp
      .database()
      .ref(`email_notifications/${auth.uid}`)
      .set(e.target.checked)
  }

  render() {
    const {
      intl,
      setSimpleValue,
      auth,
      appConfig,
      classes,
      new_user_photo,
      notificationTokens,
      emailNotifications = false,
    } = this.props

    const showPasswords = this.isLinkedWithProvider('password')

    return (
      <Page
        iconStyleRight={{ width: '50%' }}
        appBarContent={
          <div style={{ display: 'flex' }}>
            {auth.uid && (
              <IconButton
                color="inherit"
                disabled={!this.canSave()}
                aria-label="open drawer"
                onClick={() => {
                  this.submit()
                }}
              >
                <Save className="material-icons" />
              </IconButton>
            )}

            {auth.uid && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => setSimpleValue('delete_user', true)}
              >
                <Delete className="material-icons" />
              </IconButton>
            )}
          </div>
        }
        title={intl.formatMessage({ id: 'my_account' })}
      >
        <div>
          {auth.uid && (
            <div
              style={{
                margin: 15,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {this.state.values.photoURL && (
                  <Avatar
                    alt={auth.displayName}
                    src={this.state.values.photoURL}
                    className={`${classes.avatar} ${classes.bigAvatar}`}
                  />
                )}
                {!this.state.values.photoURL && (
                  <Avatar className={`${classes.avatar} ${classes.bigAvatar}`}>
                    <Person style={{ fontSize: 60 }} />{' '}
                  </Avatar>
                )}

                <IconButton
                  color="primary"
                  onClick={() => {
                    this.setState({ isPhotoDialogOpen: true })
                  }}
                >
                  <PhotoCamera />
                </IconButton>

                <div>
                  {appConfig.firebase_providers.map((p, i) => {
                    if (p !== 'email' && p !== 'password' && p !== 'phone') {
                      return (
                        <IconButton
                          key={i}
                          disabled={this.isLinkedWithProvider(p)}
                          color="primary"
                          onClick={() => {
                            this.linkUserWithPopup(p)
                          }}
                        >
                          {this.getProviderIcon(p)}
                        </IconButton>
                      )
                    } else {
                      return <div key={i} />
                    }
                  })}
                </div>

                <div>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notificationTokens.length > 0}
                          onChange={this.handleEnableNotificationsChange}
                          value="pushNotifiction"
                        />
                      }
                      label={intl.formatMessage({ id: 'notifications' })}
                    />
                  </FormGroup>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={emailNotifications === true}
                          onChange={this.handleEmailNotification}
                          value="emailNotifications"
                        />
                      }
                      label={intl.formatMessage({ id: 'email_notifications' })}
                    />
                  </FormGroup>
                </div>
              </div>

              <div
                style={{ margin: 15, display: 'flex', flexDirection: 'column' }}
              >
                <FormControl
                  className={`${classes.margin} ${classes.textField}`}
                  error={!!this.state.errors.displayName}
                >
                  <InputLabel htmlFor="adornment-password">
                    {intl.formatMessage({ id: 'name_label' })}
                  </InputLabel>
                  <Input
                    id="displayName"
                    fullWidth
                    value={this.state.values.displayName}
                    placeholder={intl.formatMessage({ id: 'name_hint' })}
                    onChange={(e) => {
                      this.handleValueChange('displayName', e.target.value)
                    }}
                  />
                  {this.state.errors.displayName && (
                    <FormHelperText id="name-helper-text">
                      {this.state.errors.displayName}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl
                  className={`${classes.margin} ${classes.textField}`}
                  error={!!this.state.errors.email}
                >
                  <InputLabel htmlFor="adornment-password">
                    {intl.formatMessage({ id: 'email' })}
                  </InputLabel>
                  <Input
                    //id="email"
                    label="Email"
                    autoComplete="off"
                    placeholder={intl.formatMessage({ id: 'email' })}
                    fullWidth
                    onChange={(e) => {
                      this.handleValueChange('email', e.target.value)
                    }}
                    value={this.state.values.email}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={
                            auth.emailVerified === true
                              ? undefined
                              : this.handleEmailVerificationsSend
                          }
                          //onMouseDown={this.handleMouseDownPassword}
                        >
                          {auth.emailVerified && (
                            <VerifiedUser color="primary" />
                          )}
                          {!auth.emailVerified && <Error color="secondary" />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {this.state.errors.email && (
                    <FormHelperText id="name-helper-text">
                      {this.state.errors.email}
                    </FormHelperText>
                  )}
                </FormControl>

                {showPasswords && (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <FormControl
                      className={`${classes.margin} ${classes.textField}`}
                      error={!!this.state.errors.password}
                    >
                      <InputLabel htmlFor="adornment-password">
                        {intl.formatMessage({ id: 'password' })}
                      </InputLabel>
                      <Input
                        autoComplete="off"
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.values.password}
                        onChange={(e) => {
                          this.handleValueChange('password', e.target.value)
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              color="primary"
                              aria-label="Toggle password visibility"
                              onClick={() =>
                                this.setState({
                                  showPassword: !this.state.showPassword,
                                })
                              }
                            >
                              {this.state.showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {this.state.errors.password && (
                        <FormHelperText id="name-helper-text">
                          {this.state.errors.password}
                        </FormHelperText>
                      )}
                    </FormControl>
                    <FormControl
                      className={`${classes.margin} ${classes.textField}`}
                      error={!!this.state.errors.newPassword}
                    >
                      <InputLabel htmlFor="adornment-password">
                        {intl.formatMessage({ id: 'new_password' })}
                      </InputLabel>
                      <Input
                        autoComplete="off"
                        type={this.state.showNewPassword ? 'text' : 'password'}
                        value={this.state.values.newPassword}
                        onChange={(e) => {
                          this.handleValueChange('newPassword', e.target.value)
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              color="primary"
                              aria-label="Toggle password visibility"
                              onClick={() =>
                                this.setState({
                                  showNewPassword: !this.state.showNewPassword,
                                })
                              }
                            >
                              {this.state.showNewPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {this.state.errors.newPassword && (
                        <FormHelperText id="name-helper-text">
                          {this.state.errors.newPassword}
                        </FormHelperText>
                      )}
                    </FormControl>
                    <FormControl
                      className={`${classes.margin} ${classes.textField}`}
                      error={!!this.state.errors.confirmPassword}
                    >
                      <InputLabel htmlFor="adornment-password">
                        {intl.formatMessage({ id: 'confirm_password' })}
                      </InputLabel>
                      <Input
                        autoComplete="off"
                        type={
                          this.state.showConfirmPassword ? 'text' : 'password'
                        }
                        value={this.state.values.confirmPassword}
                        onChange={(e) => {
                          this.handleValueChange(
                            'confirmPassword',
                            e.target.value
                          )
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              color="primary"
                              aria-label="Toggle password visibility"
                              onClick={() =>
                                this.setState({
                                  showConfirmPassword: !this.state
                                    .showConfirmPassword,
                                })
                              }
                            >
                              {this.state.showConfirmPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {this.state.errors.confirmPassword && (
                        <FormHelperText id="name-helper-text">
                          {this.state.errors.confirmPassword}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </div>
                )}
              </div>
            </div>
          )}

          {/*
          <QuestionDialog
            name="delete_user"
            handleAction={this.handleDelete}
            title={intl.formatMessage({ id: 'delete_account_dialog_title' })}
            message={intl.formatMessage({
              id: 'delete_account_dialog_message',
            })}
            action={intl.formatMessage({ id: 'delete' })}
          />

          <QuestionDialog
            name="disable_notifications"
            handleAction={this.handleDisableNotifications}
            title={intl.formatMessage({
              id: 'disable_notifications_dialog_title',
            })}
            message={intl.formatMessage({
              id: 'disable_notifications_dialog_message',
            })}
            action={intl.formatMessage({ id: 'disable' })}
          />

          <ImageCropDialog
            path={`users/${auth.uid}`}
            fileName={'photoURL'}
            onUploadSuccess={(s) => {
              this.handlePhotoUploadSuccess(s)
            }}
            open={this.state.isPhotoDialogOpen}
            src={new_user_photo}
            handleClose={() => {
              this.setState({ isPhotoDialogOpen: false })
            }}
            title={intl.formatMessage({ id: 'change_photo' })}
          />

          */}
        </div>
      </Page>
    )
  }
}

MyAccount.propTypes = {
  history: PropTypes.object,
  //setSimpleValue: PropTypes.func.isRequired,

  isGranted: PropTypes.func,
  auth: PropTypes.object.isRequired,
  vehicle_types: PropTypes.array,
}

const selector = formValueSelector(form_name)

const mapStateToProps = (state) => {
  const { intl, simpleValues, auth, messaging } = state

  //const delete_user = simpleValues.delete_user
  //const disable_notifications = simpleValues.disable_notifications
  //const new_user_photo = simpleValues.new_user_photo

  return {
    //new_user_photo,
    intl,
    //delete_user,
    //disable_notifications,
    auth,
    messaging,
    photoURL: selector(state, 'photoURL'),
    old_password: selector(state, 'old_password'),
    notificationTokens: getList(state, `notification_tokens/${auth.uid}`),
    emailNotifications: getPath(state, `email_notifications/${auth.uid}`),
    simpleValues,
  }
}

export default compose(
  connect(mapStateToProps, {
    //setSimpleValue,
    change,
    submit,
    //setDialogIsOpen,
    //setPersistentValue,
  }),
  injectIntl,
  withRouter,
  withTheme,
  withFirebase,
  withConfig,
  withStyles(styles, { withTheme: true })
)(MyAccount)
