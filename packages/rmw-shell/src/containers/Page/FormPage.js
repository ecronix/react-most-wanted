import Delete from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Page from 'material-ui-shell/lib/containers/Page'
import React from 'react'
import Save from '@material-ui/icons/Save'
import { useHistory } from 'react-router-dom'
import { usePaths } from 'rmw-shell/lib/providers/Firebase/Paths'
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'
import { useAuth } from 'base-shell/lib/providers/Auth'
import FirebaseForm from 'rmw-shell/lib/containers/FirebaseForm'

export default function (props) {
  const {
    uid,
    path = 'none',
    getPageProps = () => {},
    handleDelete = () => {},
    deleteDialogProps = {},
    grants = {},
    initialValues = {},
  } = props
  const history = useHistory()
  const { openDialog } = useQuestions()
  const { getPath, firebaseApp } = usePaths()
  const { auth } = useAuth()
  const { isGranted = () => false } = auth || {}
  let submit

  const setSubmit = (s) => {
    submit = s
  }

  const databasePath = `${path}/${uid}`
  const data = getPath(databasePath) || initialValues

  const openDeleteDialog = () => {
    openDialog({
      handleAction: async (handleClose) => {
        await firebaseApp.database().ref(`${path}/${uid}`).set(null)
        handleClose()
        handleDelete()
      },
      ...deleteDialogProps,
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
            disabled={!isGranted(auth, grants.create)}
            color="inherit"
            onClick={(e) => {
              submit(e)
            }}
          >
            <Save />
          </IconButton>

          <IconButton
            disabled={!uid || !isGranted(auth, grants.delete)}
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
      <FirebaseForm setSubmit={setSubmit} {...props} />
    </Page>
  )
}
