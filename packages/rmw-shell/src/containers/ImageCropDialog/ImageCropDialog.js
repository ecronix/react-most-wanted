import 'firebase/storage'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import CloseIcon from '@material-ui/icons/Close'
import Dialog from '@material-ui/core/Dialog'
import Dropzone from 'react-dropzone'
import IconButton from '@material-ui/core/IconButton'
import React, { Component } from 'react'
import Slide from '@material-ui/core/Slide'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import firebase from 'firebase/app'
import { Cropper } from 'react-image-cropper'
import { compose } from 'redux'
import { injectIntl } from 'react-intl'
import { withFirebase } from 'firekit-provider'
import { withTheme } from '@material-ui/core/styles'

const Transition = props => {
  return <Slide direction="up" {...props} />
}

export class ImageCropDialog extends Component {
  constructor(props) {
    super(props)
    this.cropper = null
    this.state = {
      src: undefined,
      isUploading: false,
      uploadProgress: 0
    }
  }

  handlePhotoURLUpload = photo_url => {
    const { path, fileName, onUploadSuccess, firebaseApp } = this.props

    this.setState({ isUploading: true, uploadProgress: 0 })

    let uploadTask = firebaseApp
      .storage()
      .ref(`${path}/${fileName}`)
      .putString(photo_url, 'data_url')

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        this.setState({ isUploading: true, uploadProgress: progress })
      },
      error => {
        console.log(error)
      },
      () => {
        this.setState({ isUploading: false, uploadProgress: 100, src: undefined }, () => {
          onUploadSuccess(uploadTask.snapshot)
        })
      }
    )
  }

  handlePhotoULRChange = files => {
    const reader = new FileReader()
    reader.onload = () => {
      this.setState({ src: reader.result, file: files[0] })
    }
    reader.readAsDataURL(files[0])
  }

  handleClose = () => {
    const { handleClose } = this.props
    this.setState({ src: undefined })
    handleClose()
  }

  render() {
    const { intl, open, title, theme, cropperProps } = this.props
    const { src, uploadProgress, isUploading } = this.state

    return (
      <Dialog
        fullScreen
        TransitionComponent={Transition}
        open={open}
        onClose={this.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <AppBar style={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography style={{ marginLeft: theme.spacing(2), flex: 1 }} variant="h6">
              {title}
            </Typography>
            <Button
              color="inherit"
              disabled={!src || isUploading}
              onClick={() => {
                this.handlePhotoURLUpload(this.cropper.crop())
              }}
            >
              {intl.formatMessage({ id: 'save' })}
            </Button>
          </Toolbar>
        </AppBar>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          {!src && !isUploading && (
            <Dropzone onDrop={this.handlePhotoULRChange}>
              {({ getRootProps, getInputProps }) => {
                return (
                  <div
                    {...getRootProps()}
                    style={
                      src
                        ? undefined
                        : {
                          height: '50vh',
                          width: '50vw',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderStyle: 'dashed',
                          borderColor: theme.palette.secondary.main
                        }
                    }
                  >
                    <input {...getInputProps()} />
                    <Typography>{src ? file.name : intl.formatMessage({ id: 'drop_or_select_file_label' })}</Typography>
                  </div>
                )
              }}
            </Dropzone>
          )}

          {isUploading && (
            <div>
              <CircularProgress
                variant="static"
                value={uploadProgress}
                style={{ width: 200, height: 200 }}
                size={50}
                thickness={20}
              />
            </div>
          )}

          {src && !isUploading && (
            <div style={{ maxWidth: '80vw', maxHeight: '80vh' }}>
              <Cropper
                ref={field => {
                  this.cropper = field
                }}
                src={this.state ? src : undefined}
                aspectRatio={9 / 9}
                {...cropperProps}
              />
            </div>
          )}
        </div>
      </Dialog>
    )
  }
}

export default compose(
  withFirebase,
  withTheme,
  injectIntl
)(ImageCropDialog)
