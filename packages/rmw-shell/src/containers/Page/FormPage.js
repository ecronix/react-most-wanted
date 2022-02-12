import Delete from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import Page from 'material-ui-shell/lib/containers/Page'
import React, { useState } from 'react'
import Save from '@mui/icons-material/Save'
import { useNavigate } from 'react-router-dom'
import { usePaths } from '../../providers/Firebase/Paths'
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'
import { useAuth } from 'base-shell/lib/providers/Auth'
import FirebaseForm from '../../containers/FirebaseForm'
import { getDatabase, ref, set } from 'firebase/database'

export default function FormPage(props) {
  const {
    uid,
    path = 'none',
    getPageProps = () => {},
    handleDelete = () => {},
    deleteDialogProps = {},
    grants = {},
    initialValues = {},
  } = props
  const navigate = useNavigate()
  const { openDialog } = useQuestions()
  const { getPath } = usePaths()
  const { auth } = useAuth()
  const [submit, setSubmit] = useState(false)
  const db = getDatabase()
  const { isGranted = () => false } = auth || {}

  const databasePath = `${path}/${uid}`
  const data = getPath(databasePath, {}) || initialValues

  const openDeleteDialog = () => {
    openDialog({
      handleAction: async (handleClose) => {
        await set(ref(db, `${path}/${uid}`), null)
        handleClose()
        handleDelete()
      },
      ...deleteDialogProps,
    })
  }

  return (
    <Page
      onBackClick={() => {
        navigate(-1)
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
      {...getPageProps({ values: data, submit })}
    >
      <FirebaseForm setSubmit={setSubmit} submit={submit} {...props} />
    </Page>
  )
}
