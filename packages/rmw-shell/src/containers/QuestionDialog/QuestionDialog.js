import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Slide from '@material-ui/core/Slide'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { setSimpleValue } from '../../store/simpleValues/actions'
import getSimpleValue from '../../store/simpleValues/selectors'

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class QuestionDialog extends Component {
  handleClose = () => {
    const { name, setSimpleValue, onCloseAction } = this.props
    if (onCloseAction) {
      onCloseAction()
    }
    setSimpleValue(name, undefined)
  }

  render() {
    const {
      intl,
      isDialogOpen,
      handleAction,
      fullScreen,
      title = '',
      message = '',
      action = '',
    } = this.props

    if (!isDialogOpen) {
      return null
    }

    return (
      <Dialog
        fullScreen={fullScreen}
        open={isDialogOpen}
        onClose={this.handleClose}
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
          <Button onClick={this.handleClose} color="primary">
            {intl.formatMessage({ id: 'cancel' })}
          </Button>
          <Button
            onClick={() => {
              handleAction(this.handleClose)
            }}
            color="secondary"
          >
            {action}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { name } = ownProps
  const isDialogOpen = getSimpleValue(state, name, false)

  return {
    isDialogOpen,
  }
}

QuestionDialog.propTypes = {
  name: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default compose(
  connect(mapStateToProps, { setSimpleValue }),
  withMobileDialog(),
  injectIntl
)(QuestionDialog)
