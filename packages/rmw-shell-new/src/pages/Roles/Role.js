import React, { useEffect } from 'react'
import Page from 'material-ui-shell/lib/containers/Page'
import { usePaths } from 'rmw-shell/lib/providers/Firebase/Paths'
import { useParams, useHistory } from 'react-router-dom'
import { Form, Field } from 'react-final-form'
import { TextField } from 'mui-rff'
import IconButton from '@material-ui/core/IconButton'
import AppBar from '@material-ui/core/AppBar'
import Save from '@material-ui/icons/Save'
import Delete from '@material-ui/icons/Delete'
import Lock from '@material-ui/icons/Lock'
import AccountBox from '@material-ui/icons/AccountBox'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'
import { useIntl } from 'react-intl'

export default function () {
  const history = useHistory()
  const intl = useIntl()
  const { uid, tab = 'main' } = useParams()
  const { openDialog } = useQuestions()
  const { watchPath, clearPath, getPath, firebaseApp } = usePaths()

  const path = `roles/${uid}`
  const data = getPath(path)

  useEffect(() => {
    watchPath(path)
    return () => clearPath(path)
  }, [path])

  const openDeleteDialog = () => {
    openDialog({
      title: intl.formatMessage({
        id: 'delete_role_dialog_title',
        defaultMessage: 'Delete Role?',
      }),
      message: intl.formatMessage({
        id: 'delete_role_dialog_message',
        defaultMessage: 'Role will be deleted permanently?',
      }),
      action: intl.formatMessage({
        id: 'delete_role_dialog_action',
        defaultMessage: 'DELETE ROLE',
      }),
      handleAction: async (handleClose) => {
        await firebaseApp.database().ref(`roles/${uid}`).set(null)
        handleClose()
        history.replace('/roles')
      },
    })
  }

  return (
    <Page
      onBackClick={() => {
        history.goBack()
      }}
      pageTitle={'Role'}
      appBarContent={
        <div>
          <IconButton
            color="inherit"
            onClick={() => {
              document
                .getElementById('role')
                .dispatchEvent(new Event('submit', { cancelable: true }))
            }}
          >
            <Save />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => {
              openDeleteDialog()
            }}
          >
            <Delete />
          </IconButton>
        </div>
      }
    >
      <div>
        <AppBar position="static">
          <Tabs
            value={tab}
            onChange={(e, t) => {
              history.replace(`/roles/${uid}/${t}`)
            }}
            centered
          >
            <Tab
              value="main"
              icon={<AccountBox className="material-icons" />}
            />
            <Tab value="grants" icon={<Lock className="material-icons" />} />
          </Tabs>
        </AppBar>

        {tab === 'main' && (
          <div style={{ padding: 18 }}>
            <Form
              keepDirtyOnReinitialize
              onSubmit={async (values) => {
                await firebaseApp.database().ref(`roles/${uid}`).update(values)
                history.push('/roles')
              }}
              initialValues={data}
              render={({ handleSubmit }) => (
                <form
                  id="role"
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <button type="submit" style={{ display: 'none' }} />
                  <div>
                    <TextField
                      label="Name"
                      name="name"
                      variant="outlined"
                      margin="normal"
                      required={true}
                      fullWidth={false}
                    />
                    <br />
                    <TextField
                      label="Description"
                      variant="outlined"
                      name="description"
                      margin="normal"
                      fullWidth={true}
                      multiline
                    />
                  </div>
                </form>
              )}
            />
          </div>
        )}
      </div>
    </Page>
  )
}
