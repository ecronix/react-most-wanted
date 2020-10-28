import Delete from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Page from 'material-ui-shell/lib/containers/Page'
import React, { useEffect } from 'react'
import Save from '@material-ui/icons/Save'
import { Form as FinalForm } from 'react-final-form'
import { useHistory } from 'react-router-dom'
import { usePaths } from 'rmw-shell/lib/providers/Firebase/Paths'
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'
import { useAuth } from 'base-shell/lib/providers/Auth'

export default function ({
  uid,
  path = 'none',
  getPageProps = () => {},
  handleSubmit = () => {},
  handleDelete = () => {},
  Form,
  deleteDialogProps = {},
  grants = {},
  formProps = {},
  initialValues = {},
}) {
  const history = useHistory()
  const { openDialog } = useQuestions()
  const { watchPath, clearPath, getPath, firebaseApp } = usePaths()
  const { auth } = useAuth()
  const { isGranted = () => false } = auth || {}

  const databasePath = `${path}/${uid}`
  const data = getPath(databasePath) || initialValues
  let submit

  useEffect(() => {
    if (uid) {
      watchPath(databasePath)
    }
    return () => clearPath(databasePath)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])

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
      <FinalForm
        keepDirtyOnReinitialize
        onSubmit={async (values) => {
          let newUid = false

          if (uid) {
            await firebaseApp.database().ref(`${path}/${uid}`).update(values)
          } else {
            if (isGranted(auth, grants.create)) {
              const snap = await firebaseApp.database().ref(path).push(values)
              newUid = snap.key
            } else {
              return
            }
          }

          handleSubmit(values, newUid)
        }}
        initialValues={data}
        render={({ handleSubmit, ...rest }) => {
          submit = handleSubmit
          return <Form handleSubmit={handleSubmit} {...rest} {...formProps} />
        }}
      />
    </Page>
  )
}
