import AltIconAvatar from '../../components/AltIconAvatar'
import Check from '@material-ui/icons/Check'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
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

export class UserGrants extends Component {
  componentDidMount() {
    const { watchList, userGrantsPath } = this.props

    watchList(userGrantsPath)
  }

  handleGrantToggleChange = (e, isInputChecked, key) => {
    const { firebaseApp, userGrantsPath } = this.props
    const ref = firebaseApp.database().ref(`${userGrantsPath}/${key}`)

    if (isInputChecked) {
      ref.set(true)
    } else {
      ref.remove()
    }
  }

  renderGrantItem = (list, i) => {
    const { user_grants, intl, appConfig } = this.props

    const key = list[i].val ? list[i].val.value : ''
    const val = appConfig.grants[list[i].key]
    let userGrants = []

    if (user_grants !== undefined) {
      user_grants.map(role => {
        if (role.key === key) {
          if (role.val !== undefined) {
            userGrants[role.key] = role.val
          }
        }
        return role
      })
    }

    return (
      <div key={key}>
        <ListItem key={i} id={i}>
          <AltIconAvatar icon={<Check />} />
          <ListItemText primary={intl.formatMessage({ id: `grant_${val}` })} secondary={val} />
          <ListItemSecondaryAction>
            <Switch
              checked={userGrants[key] === true}
              onChange={(e, isInputChecked) => {
                this.handleGrantToggleChange(e, isInputChecked, key)
              }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <Divider variant='inset' />
      </div>
    )
  }

  render() {
    const { intl, filters, appConfig } = this.props

    const grantList = appConfig.grants.map((grant, index) => {
      return { key: index, val: { name: intl.formatMessage({ id: `grant_${grant}` }), value: grant } }
    })

    const list = filterSelectors.getFilteredList('user_grants', filters, grantList, fieldValue => fieldValue.val)

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
        <FilterDrawer name={'user_grants'} fields={filterFields} />
      </div>
    )
  }
}

UserGrants.propTypes = {
  
  theme: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const { auth, intl, filters } = state
  const { match } = ownProps

  const uid = match.params.uid
  const rootPath = match.params.rootPath
  const rootUid = match.params.rootUid
  const userGrantsPath = rootPath ? `/${rootPath}_user_grants/${uid}/${rootUid}` : `/user_grants/${uid}`

  return {
    filters,
    auth,
    uid,
    intl,
    userGrantsPath,
    user_grants: getList(state, userGrantsPath)
  }
}

export default connect(
  mapStateToProps,
  { setSimpleValue, ...filterActions }
)(injectIntl(withRouter(withFirebase(withAppConfigs(withTheme(UserGrants))))))
