import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import Paper from '@mui/material/Paper'
import React, { useState } from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import TextField from '@mui/material/TextField'
import { Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import { useDocs } from 'rmw-shell/lib/providers/Firebase/Docs'
import { doc, setDoc, getFirestore } from 'firebase/firestore'

const defaultPath = 'test/doc'

const Docs = () => {
  const intl = useIntl()
  const [path, setPath] = useState(defaultPath)
  const [value, setValue] = useState('')
  const {
    watchDoc,
    getDoc,
    clearDoc,
    getDocError,
    isDocLoading,
    hasDocError,
    unwatchDoc,
  } = useDocs()

  const databaseValue = JSON.stringify(getDoc(path, 'no value'))
  const error = JSON.stringify(getDocError(path))
  const isLoading = isDocLoading(path)

  return (
    <Page
      pageTitle={intl.formatMessage({
        id: 'firebase_paths_demo',
        defaultMessage: 'Firebase Docs Demo',
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
              label="Doc"
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
            {hasDocError(path) && (
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
                onClick={() => {
                  watchDoc(path)
                }}
              >
                Watch
              </Button>
              <Button
                style={{ margin: 5 }}
                variant="contained"
                color="primary"
                onClick={() => unwatchDoc(path)}
              >
                unWatch
              </Button>
              <Button
                style={{ margin: 5 }}
                variant="contained"
                color="primary"
                onClick={() => clearDoc(path)}
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
                  try {
                    const db = getFirestore()
                    setDoc(doc(db, ...path.split('/')), { val: value })
                  } catch (error) {
                    console.log('error', error)
                  }
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

export default Docs
