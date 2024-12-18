import React, { useState } from 'react'
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

type UpdateDialogProps = {
  isUpdateAvailable: boolean
  runUpdate: () => void
}

/**
 * A functional React component that renders a dialog to notify the user about an available update.
 *
 * The `UpdateDialog` component provides options to proceed with an update or postpone it.
 * It handles various UI states including responsiveness and localization.
 *
 * @param {UpdateDialogProps} props - The properties passed to the `UpdateDialog` component.
 * @param {boolean} props.isUpdateAvailable - Indicates whether an update is available. If true, the dialog opens.
 * @param props.runUpdate - Callback function to run the update when the "Update" button is clicked.
 *
 * @returns The rendered update dialog component.
 *
 * @example
 * <UpdateDialog
 *   isUpdateAvailable={true}
 *   runUpdate={() => {
 *     console.log('Running update...');
 *   }}
 * />
 */

export default function UpdateDialog({
  isUpdateAvailable,
  runUpdate,
}: UpdateDialogProps) {
  const [open, setOpen] = useState<boolean | undefined>(undefined)
  const intl = useIntl()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

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
