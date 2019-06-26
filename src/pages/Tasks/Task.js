import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import FireForm from 'fireform'
import Form from '../../components/Forms/Task'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import React, { Component } from 'react'
import { Activity } from 'rmw-shell'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { setDialogIsOpen } from 'rmw-shell/lib/store/dialogs/actions'
import { submit } from 'redux-form'
import { withFirebase } from 'firekit-provider'
import { withRouter } from 'react-router-dom'

const path = '/public_tasks/'

class Task extends Component {
  componentDidMount() {
    this.props.watchList('users')
  }

  handleCreateValues = values => {
    const { auth } = this.props

    return {
      created: new Date(),
      userName: auth.displayName,
      userPhotoURL: auth.photoURL,
      userId: auth.uid,
      completed: false,
      ...values
    }
  }

  handleClose = () => {
    const { setDialogIsOpen } = this.props

    setDialogIsOpen('delete_task_from_list', undefined)
  }

  handleDelete = () => {
    const { history, match, firebaseApp } = this.props
    const uid = match.params.uid

    if (uid) {
      firebaseApp
        .database()
        .ref()
        .child(`${path}${uid}`)
        .remove()
        .then(() => {
          this.handleClose()
          history.goBack()
        })
    }
  }

  render() {
    const { history, intl, dialogs, setDialogIsOpen, firebaseApp, submit } = this.props

    return (
      <Activity
        appBarContent={
          <div style={{ display: 'flex' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => {
                submit('task')
              }}
            >
              <Icon className="material-icons">save</Icon>
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => {
                setDialogIsOpen('delete_task_from_list', true)
              }}
            >
              <Icon className="material-icons">delete</Icon>
            </IconButton>
          </div>
        }
        onBackClick={() => {
          history.goBack()
        }}
        title={intl.formatMessage({ id: this.props.match.params.uid ? 'edit_task' : 'create_task' })}
      >
        <div style={{ margin: 15, display: 'flex' }}>
          <FireForm
            firebaseApp={firebaseApp}
            name={'task'}
            path={path}
            onSubmitSuccess={values => {
              history.push('/tasks')
            }}
            onDelete={values => {
              history.push('/tasks')
            }}
            handleCreateValues={this.handleCreateValues}
            uid={this.props.match.params.uid}
          >
            <Form />
          </FireForm>
        </div>
        <Dialog
          open={dialogs.delete_task_from_list !== undefined}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{intl.formatMessage({ id: 'delete_task_title' })}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {intl.formatMessage({ id: 'delete_task_message' })}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {intl.formatMessage({ id: 'cancel' })}
            </Button>
            <Button onClick={this.handleDelete} color="secondary">
              {intl.formatMessage({ id: 'delete' })}
            </Button>
          </DialogActions>
        </Dialog>
      </Activity>
    )
  }
}

const mapStateToProps = state => {
  const { auth, intl, dialogs } = state

  return {
    auth,
    intl,
    dialogs
  }
}

export default connect(
  mapStateToProps,
  { setDialogIsOpen, submit }
)(injectIntl(withRouter(withFirebase(Task))))
