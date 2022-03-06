import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Delete from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import Paper from '@mui/material/Paper'
import React, { useState } from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useIntl } from 'react-intl'
import { useCols } from 'rmw-shell/lib/providers/Firebase/Cols'
import {
  getFirestore,
  deleteDoc,
  doc,
  addDoc,
  collection,
} from 'firebase/firestore'

const defaultPath = 'test'

const Cols = () => {
  const intl = useIntl()
  const [path, setPath] = useState(defaultPath)
  const [value, setValue] = useState('')
  const db = getFirestore()
  const {
    watchCol,
    getCol,
    clearCol,
    getColError,
    isColLoading,
    hasColError,
    unwatchCol,
  } = useCols()

  const list = getCol(path)
  const error = JSON.stringify(getColError(path))
  const isLoading = isColLoading(path)

  return (
    <Page
      pageTitle={intl.formatMessage({
        id: 'firebase_lists_demo',
        defaultMessage: 'Firebase Cols Demo',
      })}
    >
      <Scrollbar
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flex: 1,
        }}
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
              label="Col path"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              variant="outlined"
            />
            <br />
            <br />
            {isLoading && <CircularProgress />}
            <br />
            <br />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                maxHeight: 300,
                overflow: 'auto',
              }}
            >
              {list.map((i) => {
                return (
                  <div key={i.id}>
                    {JSON.stringify(i.data)}
                    <IconButton
                      onClick={() => {
                        deleteDoc(doc(db, path, i.id))
                      }}
                    >
                      <Delete color="error" />
                    </IconButton>
                  </div>
                )
              })}
            </div>
            <br />
            <br />
            {hasColError(path) && (
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
                onClick={
                  () => watchCol('test')
                  // OR
                  // watchCol('test_list')
                  // OR using an alias
                  // watchCol('test_list','your_alias)
                  // OR combination
                  // watchCol('ref(db,'test_list'),'your_alias)
                }
              >
                Watch
              </Button>
              <Button
                style={{ margin: 5 }}
                variant="contained"
                color="primary"
                onClick={() => unwatchCol(path)}
              >
                unWatch
              </Button>
              <Button
                style={{ margin: 5 }}
                variant="contained"
                color="primary"
                onClick={() => clearCol(path)}
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
                onClick={async () => {
                  await addDoc(collection(db, path), { val: value })
                  setValue('')
                }}
              >
                ADD
              </Button>
            </div>
          </Paper>
        </div>
      </Scrollbar>
    </Page>
  )
}

export default Cols
