import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Delete from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Code from '@material-ui/icons/Code'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import Paper from '@material-ui/core/Paper'
import React, { useState } from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { useIntl } from 'react-intl'
import { useLists } from 'rmw-shell/lib/providers/Firebase/Lists'

const defaultPath = 'test_list'

const Lists = () => {
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
      appBarContent={
        <IconButton
          color="inherit"
          href="https://github.com/TarikHuber/react-most-wanted/blob/master/packages/rmw-shell-new/cra-template-rmw/template/src/pages/Firebase/Lists.js"
          target="_blank"
        >
          <Code />
        </IconButton>
      }
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
                  <div key={i.key}>
                    {JSON.stringify(i.val)}
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
                onClick={
                  () => watchList(firebaseApp.database().ref(path))
                  // OR
                  // watchList(path)
                  // OR using an alias
                  // watchList(path,'your_alias)
                  // OR combination
                  // watchList('firebaseApp.database().ref(path),'your_alias)
                }
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

export default Lists
