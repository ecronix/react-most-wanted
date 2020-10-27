import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Mic from './Mic'
import MyLocation from '@material-ui/icons/MyLocation'
import Photo from '@material-ui/icons/Photo'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactList from 'react-list'
import Scrollbar from '../../components/Scrollbar'
import Send from '@material-ui/icons/Send'
import firebase from 'firebase'
import { Fab } from '@material-ui/core'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getGeolocation } from '../../utils/googleMaps'
import { injectIntl } from 'react-intl'
import { setSimpleValue } from '../../store/simpleValues/actions'
import { withFirebase } from 'firekit-provider'
import { withRouter } from 'react-router-dom'
import { withTheme } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

class ChatMessages extends Component {
  constructor(props) {
    super(props)
    this.name = null

    this.state = {
      value: '',
      isUploading: false,
    }
  }

  handleKeyDown = (e, onSucces) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      onSucces()
    }
  }

  handleAddMessage = (type, message, key) => {
    const { auth, firebaseApp, path, intl } = this.props

    let newMessage = {
      created: firebase.database.ServerValue.TIMESTAMP,
      authorName: auth.displayName,
      authorUid: auth.uid,
      authorPhotoUrl: auth.photoURL,
      languageCode: intl.formatMessage({
        id: 'current_locale',
        defaultMessage: 'en-US',
      }),
      type,
    }

    if (type === 'image') {
      newMessage.image = message
    } else if (type === 'location') {
      newMessage.location = message
    } else if (type === 'audio') {
      newMessage.audio = message
    } else {
      if (message.startsWith('http') || message.startsWith('https')) {
        newMessage.link = message
        newMessage.type = 'link'
      } else {
        newMessage.message = message
      }
    }

    this.setState({ value: '' })

    if (this.name.state) {
      this.name.state.hasValue = false
    }

    if (message && message.length > 0) {
      if (key) {
        firebaseApp
          .database()
          .ref(`${path}/${key}`)
          .update(newMessage)
      } else {
        firebaseApp
          .database()
          .ref(path)
          .push(newMessage)
      }
    }
  }

  renderItem = i => {
    const { predefinedMessages, setSimpleValue } = this.props

    const key = predefinedMessages[i].key
    const message = predefinedMessages[i].val.message

    return (
      <div key={key}>
        <ListItem
          key={key}
          onClick={() => {
            setSimpleValue('chatMessageMenuOpen', false)
            this.setState({ value: message })
          }}
          id={key}
        >
          <ListItemText primary={message} />

          <IconButton
            color="primary"
            onClick={() => {
              setSimpleValue('chatMessageMenuOpen', false)
              this.handleAddMessage('text', message)
            }}
          >
            <Send />
          </IconButton>
        </ListItem>
        <Divider variant="inset" />
      </div>
    )
  }

  uploadSelectedFile = file => {
    const { firebaseApp, intl, auth } = this.props

    if (file === null) {
      return
    }

    if ((file.size / 1024 / 1024).toFixed(4) > 20) {
      //file larger than 10mb
      alert(intl.formatMessage({ id: 'max_file_size' }))
      return
    }

    this.setState({ isUploading: true })

    let reader = new FileReader()

    const key = firebaseApp
      .database()
      .ref('/user_chat_messages/')
      .push().key

    reader.onload = fileData => {
      let uploadTask = firebaseApp
        .storage()
        .ref(`/user_chats/${auth.uid}/${key}.jpg`)
        .putString(fileData.target.result, 'data_url')

      uploadTask.on(
        'state_changed',
        () => {},
        error => {
          console.log(error)
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.handleAddMessage('image', downloadURL, key)
            this.setState({ isUploading: false })
          })
        }
      )
    }

    reader.readAsDataURL(file)
  }

  render() {
    const {
      theme,
      intl,
      chatMessageMenuOpen,
      predefinedMessages,
      path,
      receiverPath,
      auth,
    } = this.props
    const { isUploading = false } = this.state

    return (
      <div
        style={{
          display: 'block',
          alignItems: 'row',
          justifyContent: 'center',
          height: chatMessageMenuOpen ? 300 : 56,
          backgroundColor: theme.palette.background.main,
          margin: 5,
          marginBottom: 15,
          marginRight: 15,
          marginLeft: 15,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              backgroundColor:
                theme.palette.type === 'light'
                  ? theme.palette.grey[300]
                  : theme.palette.grey[700],
              flexGrow: 1,
              height: 56,
              borderRadius: 30,
              paddingLeft: 8,
              paddingRight: 8,
              margin: 5,
            }}
          >
            <div
              style={{
                position: 'relative',
                display: 'inline-block',
                width: '100%',
              }}
            >
              <Input
                id="message"
                style={{
                  position: 'absolute',
                  height: 42,
                  width: 'calc(100% - 72px)',
                  lineHeight: undefined,
                  top: -6,
                  left: 15,
                  right: 50,
                }}
                multiline
                rowsMax="2"
                disableUnderline={true}
                onChange={e => {
                  this.setState({ value: e.target.value })
                }}
                fullWidth={true}
                autoFocus
                value={this.state.value}
                autoComplete="off"
                placeholder={intl.formatMessage({ id: 'write_message_hint' })}
                onKeyDown={e => {
                  this.handleKeyDown(e, () =>
                    this.handleAddMessage('text', this.state.value)
                  )
                }}
                ref={field => {
                  this.name = field
                }}
                type="Text"
              />

              <div
                style={{
                  position: 'absolute',
                  right: 25,
                  top: -10,
                  width: 20,
                  height: 0,
                }}
              >
                <IconButton
                  color={'primary'}
                  onClick={() =>
                    getGeolocation(
                      pos => {
                        if (!pos) {
                          return
                        } else if (!pos.coords) {
                          return
                        }

                        const lat = pos.coords.latitude
                        const long = pos.coords.longitude
                        this.handleAddMessage(
                          'location',
                          `https://www.google.com/maps/place/${lat}+${long}/@${lat},${long}`
                        )
                      },
                      error => console.log(error)
                    )
                  }
                >
                  <MyLocation />
                </IconButton>
              </div>

              <input
                style={{ display: 'none' }}
                type="file"
                onChange={e => {
                  this.uploadSelectedFile(e.target.files[0])
                }}
                ref={input => {
                  this.fileInput = input
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  right: 55,
                  top: -10,
                  width: 20,
                  height: 0,
                }}
              >
                {!isUploading && (
                  <IconButton
                    color={'primary'}
                    onClick={() => this.fileInput.click()}
                  >
                    <Photo />
                  </IconButton>
                )}
                {isUploading && (
                  <CircularProgress
                    color="secondary"
                    style={{
                      width: 20,
                      height: 20,
                      marginTop: 14,
                      marginLeft: 15,
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {this.state.value !== '' && (
            <Fab
              color={'primary'}
              disabled={
                this.state.value === undefined || this.state.value === ''
              }
              onClick={() => this.handleAddMessage('text', this.state.value)}
              aria-label="send"
            >
              <Send />
            </Fab>
          )}
          {this.state.value === '' && (
            <Mic
              receiverPath={receiverPath}
              handleAddMessage={this.handleAddMessage}
              path={path}
              auth={auth}
            />
          )}
        </div>
        {chatMessageMenuOpen && (
          <Scrollbar style={{ height: 200, backgroundColor: undefined }}>
            <div style={{ padding: 10, paddingRight: 0 }}>
              <ReactList
                itemRenderer={this.renderItem}
                length={predefinedMessages ? predefinedMessages.length : 0}
                type="simple"
              />
            </div>
          </Scrollbar>
        )}
      </div>
    )
  }
}

ChatMessages.propTypes = {
  theme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownPops) => {
  const { auth, simpleValues } = state
  const { uid, path } = ownPops

  const chatMessageMenuOpen = simpleValues['chatMessageMenuOpen'] === true
  const imageDialogOpen = simpleValues.chatOpenImageDialog

  return {
    imageDialogOpen,
    simpleValues: simpleValues ? simpleValues : [],
    path,
    uid,
    chatMessageMenuOpen,
    auth,
  }
}

export default compose(
  connect(mapStateToProps, { setSimpleValue }),
  injectIntl,
  withRouter,
  withFirebase,
  withTheme
)(ChatMessages)
