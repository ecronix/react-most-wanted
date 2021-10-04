import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Delete from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import Code from '@mui/icons-material/Code'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import Paper from '@mui/material/Paper'
import React, { useState } from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useIntl } from 'react-intl'
import { useLists } from 'rmw-shell/lib/providers/Firebase/Lists'
import { getDatabase, ref, set, push } from 'firebase/database'

const defaultPath = 'test_list'

const Lists = () => {
  const intl = useIntl()
  const [path, setPath] = useState(defaultPath)
  const [value, setValue] = useState('')
  const db = getDatabase()
  const {
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
                        set(ref(db, `${path}/${i.key}`), null)
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
                  () => watchList(path)
                  //() => watchList(ref(db, path))
                  // OR
                  // watchList(path)
                  // OR using an alias
                  // watchList(path,'your_alias)
                  // OR combination
                  // watchList(ref(db,path),'your_alias')
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
                  await set(push(ref(db, path)), value)
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
