import Delete from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Page from 'material-ui-shell/lib/containers/Page'
import React, { useEffect } from 'react'
import RoleForm from 'rmw-shell/lib/components/Forms/Role'
import Save from '@material-ui/icons/Save'
import { Form } from 'react-final-form'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { usePaths } from 'rmw-shell/lib/providers/Firebase/Paths'
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'

export default function ({ uid, path = 'none', getPageProps = () => {} }) {
  const history = useHistory()
  const intl = useIntl()
  const { openDialog } = useQuestions()
  const { watchPath, clearPath, getPath, firebaseApp } = usePaths()

  const databasePath = `${path}/${uid}`
  const data = getPath(databasePath)

  useEffect(() => {
    if (uid) {
      watchPath(databasePath)
    }
    return () => clearPath(databasePath)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            disabled={!uid}
            color="inherit"
            onClick={() => {
              openDeleteDialog()
            }}
          >
            <Delete />
          </IconButton>
        </div>
      }
      {...getPageProps(data)}
    >
      <div style={{ padding: 18 }}>
        <Form
          keepDirtyOnReinitialize
          onSubmit={async (values) => {
            if (uid) {
              await firebaseApp.database().ref(`roles/${uid}`).update(values)

              history.push('/roles')
            } else {
              const newRoleSnap = await firebaseApp
                .database()
                .ref(`roles`)
                .push(values)
              history.replace(`/roles/${newRoleSnap.key}`)
            }
          }}
          initialValues={data}
          render={RoleForm}
        />
      </div>
    </Page>
  )
}
