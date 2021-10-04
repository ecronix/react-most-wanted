import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import Paper from '@mui/material/Paper'
import React, { useState } from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import TextField from '@mui/material/TextField'
import { Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import { usePaths } from 'rmw-shell/lib/providers/Firebase/Paths'
import { getDatabase, ref, set } from 'firebase/database'

const defaultPath = 'test_path'

const Paths = () => {
  const intl = useIntl()
  const db = getDatabase()
  const [path, setPath] = useState(defaultPath)
  const [value, setValue] = useState('')
  const {
    watchPath,
    getPath,
    clearPath,
    getPathError,
    isPathLoading,
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
                  set(ref(db, path), value)
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

export default Paths
