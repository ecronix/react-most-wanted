import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import Paper from '@material-ui/core/Paper'
import React, { useContext, useEffect, useState } from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Delete from '@material-ui/icons/Delete'
import { destroyList } from 'firekit/lib/store/lists/actions'
import { getPath } from 'firekit'
import { useFirebase } from 'rmw-shell/lib/providers/Firebase'
import { useIntl } from 'react-intl'
import { usePaths } from 'rmw-shell/lib/providers/Firebase/Paths'
import { useSelector } from 'react-redux'
import { useLists } from 'rmw-shell/lib/providers/Firebase/Lists'

const defaultPath = 'test_list'

export default function () {
  const intl = useIntl()
  const [path, setPath] = useState(defaultPath)
  const [value, setValue] = useState('')
  const {
    firebaseApp,
    watchList,
    getList,
    clearList,
    getListError,
    isListLoading,
    clearAllLists,
    hasListError,
    unwatchList,
  } = useLists()

  const list = getList(path)
  const error = JSON.stringify(getListError(path))
  const isLoading = isListLoading(path)

  return (
    <Page
      pageTitle={intl.formatMessage({
        id: 'firebase_lists_demo',
        defaultMessage: 'Firebase Lists Demo',
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
              label="List path"
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
                  <div>
                    {i.val}{' '}
                    <IconButton
                      onClick={() => {
                        firebaseApp.database().ref(`${path}/${i.key}`).set(null)
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
            {hasListError(path) && (
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
                onClick={() => watchList(path)}
              >
                Watch
              </Button>
              <Button
                style={{ margin: 5 }}
                variant="contained"
                color="primary"
                onClick={() => unwatchList(path)}
              >
                unWatch
              </Button>
              <Button
                style={{ margin: 5 }}
                variant="contained"
                color="primary"
                onClick={() => clearList(path)}
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
                  await firebaseApp.database().ref(path).push(value)
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
