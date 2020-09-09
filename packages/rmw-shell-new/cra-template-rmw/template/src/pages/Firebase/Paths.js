import React, { useContext, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import { useFirebase } from 'rmw-shell/lib/providers/Firebase'
import { usePaths } from 'rmw-shell/lib/providers/Firebase/Paths'
import { useSelector } from 'react-redux'
import { getPath } from 'firekit'
import { destroyList } from 'firekit/lib/store/lists/actions'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Typography } from '@material-ui/core'

const defaultPath = 'test_path'

export default function () {
  const intl = useIntl()
  const [path, setPath] = useState(defaultPath)
  const [value, setValue] = useState('')
  const {
    firebaseApp,
    watchPath,
    getPath,
    clearPath,
    getPathError,
    isPathLoading,
    clearAllPaths,
    hasPathError,
    unwatchPath,
  } = usePaths()

  const databaseValue = JSON.stringify(getPath(path, 'no value'))
  const error = JSON.stringify(getPathError(path))
  const isLoading = isPathLoading(path)

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
            {isLoading && <CircularProgress />}
            <br />
            <br />
            {databaseValue}
            <br />
            <br />
            {hasPathError(path) && (
              <Typography variant="subtitle1" color="error">
                Error: {error}
              </Typography>
            )}
            <br />
            <br />
            <div>
              <Button
                style={{ margin: 5 }}
                variant="contained"
                color="primary"
                onClick={() => watchPath(path)}
              >
                Watch
              </Button>
              <Button
                style={{ margin: 5 }}
                variant="contained"
                color="primary"
                onClick={() => unwatchPath(path)}
              >
                unWatch
              </Button>
              <Button
                style={{ margin: 5 }}
                variant="contained"
                color="primary"
                onClick={() => clearPath(path)}
              >
                clear
              </Button>
              <br />
              <br />
              <TextField
                label="Value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                variant="outlined"
              />
              <br />
              <br />
              <Button
                style={{ margin: 5 }}
                variant="contained"
                color="primary"
                onClick={() => {
                  firebaseApp.database().ref(path).set(value)
                }}
              >
                set
              </Button>
            </div>
          </Paper>
        </div>
      </Scrollbar>
    </Page>
  )
}
