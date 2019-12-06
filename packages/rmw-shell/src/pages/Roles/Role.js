import AccountBox from '@material-ui/icons/AccountBox'
import Activity from '../../containers/Activity'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Delete from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import FilterList from '@material-ui/icons/FilterList'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Lock from '@material-ui/icons/Lock'
import React, { Component } from 'react'
import RoleGrants from '../../containers/Roles/RoleGrants'
import Save from '@material-ui/icons/Save'
import Scrollbar from '../../components/Scrollbar/Scrollbar'
import SearchField from '../../components/SearchField'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import classNames from 'classnames'
import { change, submit } from 'redux-form'
import { connect } from 'react-redux'
import { filterSelectors, filterActions } from 'material-ui-filter'
import { injectIntl } from 'react-intl'
import { isLoading } from 'firekit'
import { setDialogIsOpen } from '../../store/dialogs/actions'
import { withAppConfigs } from '../../contexts/AppConfigProvider'
import { withFirebase } from 'firekit-provider'
import { withRouter } from 'react-router-dom'
import { withTheme, withStyles } from '@material-ui/core/styles'

const path = '/roles'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default
  },
  tabs: {
    flex: 1,
    width: '100%'
  },
  form: {
    backgroundColor: theme.palette.background.default,
    margin: 15,
    display: 'flex',
    justifyContent: 'center'
  }
})

export class Role extends Component {
  state = {
    values: {
      name: '',
      description: ''
    },
    errors: {}
  }

  validate = values => {
    const { intl } = this.props
    const errors = {}

    errors.name = !values.name ? intl.formatMessage({ id: 'error_required_field' }) : ''

    return errors
  }

  clean = obj => {
    Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key])
    return obj
  }

  submit = () => {
    const { firebaseApp, uid, history } = this.props

    const values = this.state.values

    firebaseApp
      .database()
      .ref(`roles/${uid}`)
      .update(this.clean(values))
      .then(() => {
        history.push('/roles')
      })
  }

  handleTabActive = (e, value) => {
    const { history, uid } = this.props

    history.push(`${path}/edit/${uid}/${value}`)
  }

  handleValueChange = (name, value) => {
    return this.setState({ values: { ...this.state.values, [name]: value } }, () => {
      this.validate()
    })
  }

  componentDidMount() {
    const { watchList, firebaseApp, uid } = this.props
    watchList('grants')
    watchList('role_grants')

    firebaseApp
      .database()
      .ref(`roles/${uid}`)
      .on('value', snap => {
        this.setState({ values: snap.val() ? snap.val() : {} })
      })

    //watchPath(`roles/${uid}`)
    //setSearch('role_grants', '')
  }

  handleClose = () => {
    const { setDialogIsOpen } = this.props

    setDialogIsOpen('delete_role', false)
  }

  validate = () => {
    const errors = {}
    const values = this.state.values

    if (!values.name) {
      errors.displayName = 'Required'
    }

    this.setState({ errors })
  }

  handleDelete = () => {
    const { history, match, firebaseApp } = this.props
    const uid = match.params.uid

    if (uid) {
      firebaseApp
        .database()
        .ref()
        .child(`${path}/${uid}`)
        .remove()
        .then(() => {
          this.handleClose()
          history.goBack()
        })
    }
  }

  canSave = () => {
    if (Object.keys(this.state.errors).length) {
      return false
    }

    return true
  }

  render() {
    const {
      history,
      intl,
      dialogs,
      setDialogIsOpen,
      theme,
      editType,
      hasFilters,
      setFilterIsOpen,
      isLoading,
      classes
    } = this.props

    return (
      <Activity
        isLoading={isLoading}
        appBarContent={
          <div>
            {editType === 'main' && (
              <IconButton
                color="inherit"
                disabled={!this.canSave()}
                aria-label="open drawer"
                onClick={() => {
                  this.submit()
                }}
              >
                <Save className="material-icons" />
              </IconButton>
            )}

            {editType === 'main' && (
              <IconButton color="inherit" aria-label="open drawer" onClick={() => setDialogIsOpen('delete_role', true)}>
                <Delete className="material-icons" />
              </IconButton>
            )}

            {editType === 'grants' && (
              <div style={{ display: 'flex' }}>
                <SearchField filterName={'role_grants'} />

                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={() => setFilterIsOpen('role_grants', true)}
                >
                  <FilterList
                    className="material-icons"
                    color={hasFilters ? theme.palette.accent1Color : theme.palette.canvasColor}
                  />
                </IconButton>
              </div>
            )}
          </div>
        }
        onBackClick={() => history.push('/roles')}
        title={intl.formatMessage({ id: 'edit_role' })}
      >
        <Scrollbar style={{ height: '100%' }}>
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs value={editType} onChange={this.handleTabActive} fullWidth centered>
                <Tab value="main" icon={<AccountBox className="material-icons" />} />
                <Tab value="grants" icon={<Lock className="material-icons" />} />
              </Tabs>
            </AppBar>

            {editType === 'main' && (
              <div className={classes.form}>
                <div style={{ margin: 15, display: 'flex', flexDirection: 'column' }}>
                  <FormControl
                    className={classNames(classes.margin, classes.textField)}
                    error={!!this.state.errors.name}
                  >
                    <InputLabel htmlFor="adornment-password">{intl.formatMessage({ id: 'name_label' })}</InputLabel>
                    <Input
                      id="name"
                      fullWidth
                      value={this.state.values.name}
                      placeholder={intl.formatMessage({ id: 'name_hint' })}
                      onChange={e => {
                        this.handleValueChange('name', e.target.value)
                      }}
                    />
                    {this.state.errors.displayName && (
                      <FormHelperText id="name-helper-text">{this.state.errors.displayName}</FormHelperText>
                    )}
                  </FormControl>
                  <br />
                  <FormControl className={classNames(classes.margin, classes.textField)}>
                    <InputLabel htmlFor="adornment-password">
                      {intl.formatMessage({ id: 'description_label' })}
                    </InputLabel>
                    <Input
                      id="description"
                      fullWidth
                      multiline
                      value={this.state.values.description}
                      placeholder={intl.formatMessage({ id: 'description_hint' })}
                      onChange={e => {
                        this.handleValueChange('description', e.target.value)
                      }}
                    />
                  </FormControl>
                </div>
              </div>
            )}
            {editType === 'grants' && <RoleGrants {...this.props} />}
          </div>
        </Scrollbar>

        <Dialog
          open={dialogs.delete_role === true}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{intl.formatMessage({ id: 'delete_role_dialog_title' })}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {intl.formatMessage({ id: 'delete_role_dialog_message' })}
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

const mapStateToProps = (state, ownProps) => {
  const { auth, intl, dialogs, lists, filters } = state

  const { match } = ownProps
  const editType = match.params.editType ? match.params.editType : 'data'
  const uid = match.params.uid ? match.params.uid : ''
  const { hasFilters } = filterSelectors.selectFilterProps('role_grants', filters)

  return {
    auth,
    intl,
    uid,
    dialogs,
    hasFilters,
    editType,
    role_grants: lists.role_grants,
    isLoading: isLoading(state, 'role_grants')
  }
}

export default connect(
  mapStateToProps,
  { setDialogIsOpen, change, submit, ...filterActions }
)(injectIntl(withRouter(withFirebase(withAppConfigs(withStyles(styles, { withTheme: true })(withTheme(Role)))))))
