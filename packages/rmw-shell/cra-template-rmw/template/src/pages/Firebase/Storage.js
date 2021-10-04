import Button from '@mui/material/Button'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import Paper from '@mui/material/Paper'
import React, { useState } from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import TextField from '@mui/material/TextField'
import { Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import { useStorage } from 'rmw-shell/lib/providers/Firebase/Storage'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const defaultPath = 'test_path'

const Storage = () => {
  const intl = useIntl()
  const [path, setPath] = useState(defaultPath)
  const {
    getUploadError,
    isUploading,
    getDownloadURL,
    hasUploadError = () => {},
    uploadFile,
    clearUpload,
    getUploadProgress,
  } = useStorage()

  const databaseValue = getDownloadURL(path)
  const error = JSON.stringify(getUploadError(path))
  const isLoading = isUploading(path)
  const progress = getUploadProgress(path)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]

    if (file) {
      clearUpload(path)
      uploadFile(path, `${path}/${file.name}`, file)
    }
  }

  return (
    <Page
      pageTitle={intl.formatMessage({
        id: 'firebase_paths_demo',
        defaultMessage: 'Firebase Paths Demo',
      })}
    >
      <Scrollbar
        style={{ height: '100%', width: '100%', display: 'flex', flex: 1 }}
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
            style={{
              maxWidth: 450,
              minWidth: 300,
              minHeight: 300,
              padding: 18,
            }}
          >
            <TextField
              label="Path"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              variant="outlined"
            />
            <br />
            <br />
            {isLoading && (
              <Box position="relative" display="inline-flex">
                <CircularProgress variant="static" value={progress} />
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
                  <Typography
                    variant="caption"
                    component="div"
                    color="textSecondary"
                  >{`${Math.round(progress)}%`}</Typography>
                </Box>
              </Box>
            )}
            <br />
            <br />
            {databaseValue}
            {databaseValue && (
              <img style={{ maxWidth: 300 }} alt="value" src={databaseValue} />
            )}
            <br />
            <br />
            {hasUploadError(path) && (
              <Typography variant="subtitle1" color="error">
                Error: {error}
              </Typography>
            )}
            <br />
            <br />
            <div>
              <input
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
                id="contained-button-file"
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  style={{ margin: 5 }}
                  variant="contained"
                  color="primary"
                  component="span"
                >
                  UPLOAD
                </Button>
              </label>
            </div>
          </Paper>
        </div>
      </Scrollbar>
    </Page>
  )
}

export default Storage
