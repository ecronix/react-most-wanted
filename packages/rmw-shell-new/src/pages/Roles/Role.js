import AccountBox from '@material-ui/icons/AccountBox'
import AppBar from '@material-ui/core/AppBar'
import Delete from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Lock from '@material-ui/icons/Lock'
import Page from 'material-ui-shell/lib/containers/Page'
import React, { useEffect } from 'react'
import RoleForm from 'rmw-shell/lib/components/Forms/Role'
import Save from '@material-ui/icons/Save'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import { Form } from 'react-final-form'
import { useIntl } from 'react-intl'
import { useParams, useHistory } from 'react-router-dom'
import { usePaths } from 'rmw-shell/lib/providers/Firebase/Paths'
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'

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
        <div style={{ display: tab === 'main' ? undefined : 'none' }}>
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
              render={RoleForm}
            />
          </div>
        )}
      </div>
    </Page>
  )
}
