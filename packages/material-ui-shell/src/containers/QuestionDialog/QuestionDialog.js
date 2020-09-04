import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import React, { useContext } from 'react'
import SimpleValuesContext from 'base-shell/lib/providers/SimpleValues/Context'
import Slide from '@material-ui/core/Slide'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useIntl } from 'react-intl'
import { useTheme } from '@material-ui/core/styles'

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" {...props} ref={ref} />
))

const QuestionDialog = ({
  id = '',
  message = '',
  title = '',
  action = '',
  handleAction = () => {},
}) => {
  const intl = useIntl()
  const theme = useTheme()
  const { getValue, setValue } = useContext(SimpleValuesContext)
  const handleClose = () => {
    setValue(id, false)
  }
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const isDialogOpen = getValue(id)

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isDialogOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {intl.formatMessage({ id: 'cancel' })}
        </Button>
        <Button
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

export default QuestionDialog
