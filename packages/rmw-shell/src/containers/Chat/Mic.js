import CircularProgress from '@material-ui/core/CircularProgress'
import Close from '@material-ui/icons/Close'
import Microfone from '@material-ui/icons/Mic'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Send from '@material-ui/icons/Send'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { Fab } from '@material-ui/core'
import { ReactMic } from 'react-mic'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { setSimpleValue } from '../../store/simpleValues/actions'
import { withFirebase } from 'firekit-provider'
import { withRouter } from 'react-router-dom'
import { withTheme } from '@material-ui/core/styles'

export class Mic extends Component {
  constructor(props) {
    super(props)

    this.state = {
      record: false,
      visible: false,
      send: false,
    }
  }

  startRecording = () => {
    this.setState({
      record: true,
      visible: true,
    })
  }

  stopRecording = () => {
    this.setState({
      send: true,
      record: false,
    })
  }

  cancelRecording = () => {
    this.setState({
      record: false,
      visible: false,
    })
  }

  onStop = recordedBlob => {
    this.setState({
      record: false,
      visible: false,
      uploadCompleted: 0,
    })

    if (this.state.send) {
      this.uploadAudioFile(recordedBlob.blob)
    }
  }

  uploadAudioFile = file => {
    const {
      firebaseApp,
      intl,
      handleAddMessage,
      path,
      receiverPath,
      auth,
    } = this.props

    if (file === null) {
      return
    }

    if ((file.size / 1024 / 1024).toFixed(4) > 20) {
      //file larger than 10mb
      alert(intl.formatMessage({ id: 'max_file_size' }))
      return
    }

    let key = firebaseApp
      .database()
      .ref('/user_chat_messages/')
      .push().key

    const metadata = {
      customMetadata: {
        path,
        receiverPath,
        key,
        languageCode: intl.formatMessage({
          id: 'current_locale',
          defaultMessage: 'en-US',
        }),
      },
    }

    let uploadTask = firebaseApp
      .storage()
      .ref(`/user_chats/${auth.uid}/${key}.opus`)
      .put(file, metadata)

    uploadTask.on(
      'state_changed',
      snapshot => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

        this.setState({
          sending: true,
          uploadCompleted: progress,
        })
      },
      error => {
        console.log(error)
      },
      () => {
        this.setState({
          sending: false,
          uploadCompleted: undefined,
        })

        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          handleAddMessage('audio', downloadURL, key)
        })
      }
    )
  }

  render() {
    const { theme, width } = this.props

    return (
      <div>
        {this.state.sending && (
          <CircularProgress
            style={{ position: 'absolute', right: 13, bottom: 5, zIndex: 90 }}
            mode="determinate"
            value={this.state.uploadCompleted}
            size={62}
            thickness={4}
          />
        )}

        {this.state.visible && (
          <div style={{ display: 'flex', width: '100%' }}>
            <Fab
              style={{ marginRight: -25 }}
              color="secondary"
              onClick={this.cancelRecording}
            >
              <Close className="material-icons" />
            </Fab>
            <ReactMic
              style={{ marginTop: 25 }}
              height={30}
              width={isWidthUp('sm', width) ? 200 : 80}
              className="oscilloscope"
              visualSetting="sinewave"
              mimeType={'audio/ogg; codecs=opus'}
              record={this.state.record}
              onStop={this.onStop}
              strokeColor={theme.palette.secondary.main}
              backgroundColor={
                theme.palette.type === 'light'
                  ? theme.palette.grey[300]
                  : theme.palette.grey[700]
              }
            />
            <Fab
              style={{ marginLeft: -25 }}
              color="secondary"
              onClick={this.stopRecording}
            >
              <Send />
            </Fab>
          </div>
        )}

        {!this.state.visible && (
          <Fab
            color="secondary"
            disabled={this.state.sending}
            onClick={
              this.state.record ? this.stopRecording : this.startRecording
            }
          >
            {this.state.record ? <Send /> : <Microfone />}
          </Fab>
        )}
      </div>
    )
  }
}

Mic.propTypes = {
  theme: PropTypes.object.isRequired,
}

export default compose(
  connect(null, { setSimpleValue }),
  injectIntl,
  withTheme,
  withWidth(),
  withTheme,
  withRouter,
  withFirebase
)(Mic)
