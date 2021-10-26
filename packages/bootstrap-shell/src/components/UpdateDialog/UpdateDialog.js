import React from 'react'
import { useIntl } from 'react-intl'
import { useTheme } from '@mui/material/styles'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from '@mui/material'

export default function UpdateDialog({ isUpdateAvailable, runUpdate }) {
  const [open, setOpen] = React.useState(undefined)
  const intl = useIntl()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleUpdate = () => {
    handleClose()
    runUpdate()
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isUpdateAvailable && open === undefined}
      onClose={handleClose}
      aria-labelledby="update-dialog-title"
    >
      <DialogTitle id="update-dialog-title">
        {intl.formatMessage({
          id: 'update_dialog_title',
          defaultMessage: 'Update available!',
        })}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {intl.formatMessage({
            id: 'update_dialog_message',
            defaultMessage:
              'Make sure to save all data before updating. The update could cause losing unsaved data. You can also make the update later.',
          })}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          {intl.formatMessage({
            id: 'update_dialog_later',
            defaultMessage: 'Later',
          })}
        </Button>
        <Button onClick={handleUpdate} color="secondary" autoFocus>
          {intl.formatMessage({
            id: 'update_dialog_update',
            defaultMessage: 'Update',
          })}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
