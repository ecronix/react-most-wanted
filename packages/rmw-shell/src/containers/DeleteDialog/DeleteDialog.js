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

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class DeleteDialog extends Component {
  handleClose = () => {
    const { deleteKey, setSimpleValue } = this.props
    setSimpleValue(deleteKey, undefined)
  }

  render() {
    const { intl, isDialogOpen, handleDelete, name, fullScreen, deleteUid } = this.props

    if(!isDialogOpen){
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
        <DialogTitle id="alert-dialog-title">{intl.formatMessage({ id: `delete_${name}_title` })}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {intl.formatMessage({ id: `delete_${name}_message` })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            {intl.formatMessage({ id: 'cancel' })}
          </Button>
          <Button
            onClick={() => {
              handleDelete(this.handleClose, deleteUid)
            }}
            color="secondary"
          >
            {intl.formatMessage({ id: 'delete' })}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { simpleValues } = state
  const { name } = ownProps

  const deleteKey = `delete_${name}`
  const isDialogOpen = simpleValues && simpleValues[deleteKey] ? true : false
  const deleteUid = simpleValues ? simpleValues[deleteKey] : false

  return {
    deleteUid,
    deleteKey,
    isDialogOpen
  }
}

DeleteDialog.propTypes = {
  name: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  
}

export default compose(
  connect(
    mapStateToProps,
    { setSimpleValue }
  ),
  withMobileDialog(),
  injectIntl
)(DeleteDialog)
