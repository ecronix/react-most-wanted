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
import { TransitionComponentProps } from '@ecronix/material-ui-shell/common.type'

const Transition = React.forwardRef<unknown, TransitionComponentProps>(
  (props, ref) => <Slide direction="up" {...props} ref={ref} />
)

type QuestionDialogProps = {
  isProcessing?: boolean
  isOpen?: boolean
  id?: string
  message?: string
  title?: string
  action?: string
  handleAction?: (handleClose: () => void) => void
  handleClose?: () => void
  [key: string]: any
}

/**
 * @description Quection dialog react component. Uses Dialog from @mui/material as base component
 * The `QuestionDialog` component displays a customizable dialog with a title, message,
 * and action buttons. It supports asynchronous actions and allows for custom closing behavior.
 *
 *
 * @param {QuestionDialogProps} props - The properties passed to the `QuestionDialog` component.
 * @param {boolean} [props.isProcessing=false] - Indicates whether the dialog is in a loading or processing state.
 * @param {boolean} [props.isOpen=false] - Determines whether the dialog is open or closed.
 * @param {string} [props.id=''] - An optional identifier for the dialog instance.
 * @param {string} [props.message=''] - The message displayed in the dialog body.
 * @param {string} [props.title=''] - The title of the dialog.
 * @param {string} [props.action=''] - The label for the action button.
 * @param {(handleClose: () => void) => void} [props.handleAction] - Callback executed when the action button is clicked.
 *   Receives the `handleClose` function as an argument to allow closing the dialog.
 * @param {() => void} [props.handleClose] - Callback executed when the dialog is closed.
 * @param rest - Additional props passed to the dialog component.
 *
 * @returns React component Question dialog
 */
export default function QuestionDialog({
  isProcessing = false,
  isOpen = false,
  id = '',
  message = '',
  title = '',
  action = '',
  handleAction = (handleClose: () => void) => {},
  handleClose = () => {},
  ...rest
}: QuestionDialogProps) {
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
