import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Delete from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import Paper from '@material-ui/core/Paper'
import React, { useState } from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { useIntl } from 'react-intl'
import { useCols } from 'rmw-shell/lib/providers/Firebase/Cols'

const defaultPath = 'test'

const Cols = () => {
  const intl = useIntl()
  const [path, setPath] = useState(defaultPath)
  const [value, setValue] = useState('')
  const {
    firebaseApp,
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
                        firebaseApp
                          .firestore()
                          .collection(path)
                          .doc(i.id)
                          .delete()
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
                  // watchCol('firebaseApp.database().ref('test_list'),'your_alias)
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
                  await firebaseApp
                    .firestore()
                    .collection(path)
                    .doc()
                    .set({ val: value })
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
