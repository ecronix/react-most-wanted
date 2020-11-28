import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Cropper from 'react-easy-crop'
import Dialog from '@material-ui/core/Dialog'
import CloudUpload from '@material-ui/icons/CloudUpload'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import React, { useState, useCallback, useEffect } from 'react'
import Slide from '@material-ui/core/Slide'
import getCroppedImg from './getCropImage'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useIntl } from 'react-intl'
import { useStorage } from 'rmw-shell/lib/providers/Firebase/Storage'
import { useTheme } from '@material-ui/core/styles'

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" {...props} ref={ref} />
))

const getFiles = (ev) => {
  const files = []
  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      // If dropped items aren't files, reject them
      if (ev.dataTransfer.items[i].kind === 'file') {
        files.push(ev.dataTransfer.items[i].getAsFile())
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.files.length; i++) {
      files.push(ev.dataTransfer.files[i])
    }
  }

  return files
}

export default function ({
  isOpen = false,
  handleClose,
  handleCropSubmit,
  path,
  cropperProps,
}) {
  const intl = useIntl()
  const theme = useTheme()
  const [isOver, setIsOver] = useState(false)
  const [file, setFile] = useState(false)
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [croppedImage, setCroppedImage] = useState(false)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const {
    getUploadError,
    isUploading,
    hasUploadError,
    uploadString,
    clearUpload,
    getUploadProgress,
  } = useStorage()

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const clear = () => {
    clearUpload()
    setCroppedImage(false)
    setFile(false)
    setCroppedAreaPixels(null)
    setIsOver(false)
  }

  useEffect(() => {
    clear()
    return clear
  }, [path])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(file, croppedAreaPixels, 0)

      setCroppedImage(croppedImage)
      uploadString(
        path,
        path,
        croppedImage,
        'data_url',
        {
          contentType: 'image/jpeg',
        },
        (downloadURL) => {
          if (handleCropSubmit) {
            handleClose()
            handleCropSubmit(downloadURL)
          }
        }
      )
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels])

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <div
          style={{
            width: '100%',
            height: '100%',
            minWidth: 350,
            padding: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {!file && (
            <div
              onDrop={(e) => {
                e.preventDefault()

                const files = getFiles(e)
                if (files.length) {
                  var reader = new FileReader()

                  reader.onload = (e) => {
                    setFile(e.target.result)
                  }

                  reader.readAsDataURL(files[0])
                }
              }}
              onDragOver={(e) => {
                e.preventDefault()
                setIsOver(true)
              }}
              onDragLeave={(e) => {
                e.preventDefault()
                setIsOver(false)
              }}
              style={{
                width: '100%',
                minHeight: 350,
                borderStyle: 'dashed',
                borderColor: isOver ? 'red' : 'grey',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <CloudUpload color="disabled" style={{ height: 60, width: 60 }} />
              <Typography variant="h6" style={{ color: 'grey' }}>
                {intl.formatMessage({
                  id: 'file_upload_text',
                  defaultMessage: 'Drop image here or ',
                })}
              </Typography>
              <input
                style={{ display: 'none' }}
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={(e) => {
                  if (e.target.files) {
                    var reader = new FileReader()

                    reader.onload = (e) => {
                      setFile(e.target.result)
                    }

                    reader.readAsDataURL(e.target.files[0])
                  }
                }}
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  style={{ margin: 8 }}
                >
                  Upload
                </Button>
              </label>
            </div>
          )}
          {file && !croppedImage && (
            <div
              style={{
                position: 'relative',
                height: 300,
                width: '100%',
                background: 'black',
              }}
            >
              <Cropper
                cropShape="round"
                showGrid={false}
                image={file}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                {...cropperProps}
              />
            </div>
          )}
          {croppedImage && (
            <Box
              position="relative"
              display="inline-flex"
              style={{ height: 280 }}
            >
              <CircularProgress
                size={280}
                color={hasUploadError(path) ? 'secondary' : 'primary'}
                variant="static"
                value={getUploadProgress(path)}
              />
              <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <img
                  style={{ height: 250, borderRadius: '50%' }}
                  src={croppedImage}
                  alt="img"
                />
              </Box>
            </Box>
          )}
          {getUploadError(path) && (
            <Typography color="error" variant="subtitle1">
              {JSON.stringify(getUploadError(path))}
            </Typography>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          {intl.formatMessage({ id: 'cancel', defaultMessage: 'Cancel' })}
        </Button>
        <Button
          disabled={isUploading(path) || hasUploadError(path) || !file}
          onClick={showCroppedImage}
          color="primaryy"
        >
          {intl.formatMessage({ id: 'save', defaultMessage: 'Save' })}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
