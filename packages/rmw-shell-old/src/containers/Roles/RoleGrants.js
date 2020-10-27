import AltIconAvatar from '../../components/AltIconAvatar'
import Check from '@material-ui/icons/Check'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactList from 'react-list'
import Switch from '@material-ui/core/Switch'
import { FilterDrawer, filterSelectors, filterActions } from 'material-ui-filter'
import { connect } from 'react-redux'
import { getList } from 'firekit'
import { injectIntl } from 'react-intl'
import { setSimpleValue } from '../../store/simpleValues/actions'
import { withAppConfigs } from '../../contexts/AppConfigProvider'
import { withFirebase } from 'firekit-provider'
import { withRouter } from 'react-router-dom'
import { withTheme } from '@material-ui/core/styles'

export class RoleGrants extends Component {
  handleGrantToggleChange = (e, isInputChecked, key) => {
    const { firebaseApp, match } = this.props
    const uid = match.params.uid

    if (isInputChecked) {
      firebaseApp
        .database()
        .ref(`/role_grants/${uid}/${key}`)
        .set(true)
    } else {
      firebaseApp
        .database()
        .ref(`/role_grants/${uid}/${key}`)
        .remove()
    }
  }

  renderGrantItem = (list, i, k) => {
    const { user_grants, match, intl, appConfig } = this.props

    const uid = match.params.uid
    const key = list[i].key
    const val = appConfig.grants[list[i].key]
    let userGrants = []

    if (user_grants !== undefined) {
      user_grants.map(role => {
        if (role.key === uid) {
          if (role.val !== undefined) {
            userGrants = role.val
          }
        }
        return role
      })
    }

    return (
      <div key={key}>
        <ListItem key={i} id={i}>
          <AltIconAvatar icon={<Check />}/>
          <ListItemText primary={intl.formatMessage({ id: `grant_${val}` })} secondary={val} />
          <Switch
            checked={userGrants[val] === true}
            onChange={(e, isInputChecked) => {
              this.handleGrantToggleChange(e, isInputChecked, val)
            }}
          />
        </ListItem>
        <Divider variant='inset' />
      </div>
    )
  }

  render() {
    const { intl, filters, appConfig } = this.props

    let grantList = []
    appConfig.grants.forEach((grant, index) => {
      grantList.push({ key: index, val: { name: intl.formatMessage({ id: `grant_${grant}` }), value: grant } })
    })

    const list = filterSelectors.getFilteredList('role_grants', filters, grantList, fieldValue => fieldValue.val)

    const filterFields = [
      {
        name: 'name',
        label: intl.formatMessage({ id: 'name_label' })
      },
      {
        name: 'value',
        label: intl.formatMessage({ id: 'value_label' })
      }
    ]

    return (
      <div style={{ height: '100%' }}>
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
        <FilterDrawer name={'role_grants'} fields={filterFields} formatMessage={intl.formatMessage} />
      </div>
    )
  }
}

RoleGrants.propTypes = {
  
  theme: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const { auth, intl, lists, filters } = state
  const { match } = ownProps

  const uid = match.params.uid

  return {
    filters,
    auth,
    uid,
    intl,
    user_grants: getList(state, 'role_grants')
  }
}

export default connect(
  mapStateToProps,
  { setSimpleValue, ...filterActions }
)(injectIntl(withRouter(withFirebase(withAppConfigs(withTheme(RoleGrants))))))
