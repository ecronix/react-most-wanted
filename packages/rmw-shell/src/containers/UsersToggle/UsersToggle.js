import AltIconAvatar from '../../components/AltIconAvatar'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Person from '@material-ui/icons/Person'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactList from 'react-list'
import Switch from '@material-ui/core/Switch'
import { FilterDrawer, filterSelectors, filterActions } from 'material-ui-filter'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { setSimpleValue } from '../../store/simpleValues/actions'
import { withFirebase } from 'firekit-provider'
import { withRouter } from 'react-router-dom'
import { withTheme } from '@material-ui/core/styles'

class UsersToggle extends Component {
  componentDidMount() {
    const { watchList, path, setSearch } = this.props

    setSearch('users_toggle', '')
    watchList(path)
  }

  renderGrantItem = (list, i) => {
    const { getValue, onChange, onClick } = this.props

    const userUid = list[i].key
    const user = list[i].val
    const checked = getValue(userUid)

    return (
      <div key={i}>
        <ListItem key={userUid} id={userUid} onClick={onClick ? () => onClick(userUid, user) : undefined}>
          <AltIconAvatar alt="person" src={user.photoURL} icon={<Person/>} />
          <ListItemText
            primary={<div style={{ fontFamily: 'Roboto' }}>{user.displayName}</div>}
            secondaryText={<div style={{ fontFamily: 'Roboto' }}>{user.email}</div>}
          />
          <ListItemSecondaryAction>
            <Switch checked={checked === true} onChange={(e, newVal) => onChange(userUid, newVal)} />
          </ListItemSecondaryAction>
        </ListItem>
        <Divider variant='inset' />
      </div>
    )
  }

  render() {
    const { intl, list } = this.props

    const filterFields = [
      {
        name: 'displayName',
        label: intl.formatMessage({ id: 'name_label' })
      },
      {
        name: 'value',
        label: intl.formatMessage({ id: 'value_label' })
      }
    ]

    return (
      <div>
        <List
          style={{ height: '100%' }}
          ref={field => {
            this.list = field
          }}
        >
          <ReactList
            itemRenderer={(i, k) => this.renderGrantItem(list, i, k)}
            length={list ? list.length : 0}
            type="simple"
          />
        </List>
        <FilterDrawer name={'users_toggle'} fields={filterFields} formatMessage={intl.formatMessage} />
      </div>
    )
  }
}

UsersToggle.propTypes = {
  
  theme: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const { auth, intl, lists, filters } = state
  const { getValue, onChange } = ownProps

  const path = 'users'
  const list = filterSelectors.getFilteredList('users_toggle', filters, lists[path], fieldValue => fieldValue.val)

  return {
    path,
    getValue: getValue ? getValue : () => false,
    onChange: onChange ? onChange : () => {},
    list,
    filters,
    auth,
    intl,
    user_grants: lists.user_grants
  }
}

export default connect(
  mapStateToProps,
  { setSimpleValue, ...filterActions }
)(injectIntl(withRouter(withFirebase(withTheme(UsersToggle)))))
