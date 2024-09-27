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
  Slide,
  useMediaQuery,
} from '@mui/material'

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" {...props} ref={ref} />
))

export default function QuestionDialog({
  isProcessing = false,
  isOpen = false,
  id = '',
  message = '',
  title = '',
  action = '',
  handleAction = () => {},
  handleClose = () => {},
  ...rest
}) {
  const intl = useIntl()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...rest}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {intl.formatMessage({ id: 'cancel', defaultMessage: 'Cancel' })}
        </Button>
        <Button
          disabled={isProcessing}
          onClick={() => {
            handleAction(handleClose)
          }}
          color="secondary"
        >
          {action}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
