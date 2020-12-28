import Activity from '../../containers/Activity'
import AltIconAvatar from '../../components/AltIconAvatar'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Person from '@material-ui/icons/Person'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactList from 'react-list'
import Scrollbar from '../../components/Scrollbar'
import SearchField from '../../components/SearchField'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { filterSelectors, filterActions } from 'material-ui-filter'
import { getList, isLoading } from 'firekit'
import { injectIntl } from 'react-intl'
import { setPersistentValue } from '../../store/persistentValues/actions'
import { withFirebase } from 'firekit-provider'
import { withRouter } from 'react-router-dom'
import { withTheme } from '@material-ui/core/styles'

const path = 'users'

export class Users extends Component {
  componentDidMount() {
    const { watchList } = this.props

    watchList(path)
  }

  handleRowClick = user => {
    const { auth, firebaseApp, history, usePreview, setPersistentValue } = this.props

    const key = user.key
    const userValues = user.val
    const userChatsRef = firebaseApp.database().ref(`/user_chats/${auth.uid}/${key}`)

    const chatData = {
      displayName: userValues.displayName,
      photoURL: userValues.photoURL ? userValues.photoURL : '',
      lastMessage: ''
    }

    userChatsRef.update({ ...chatData })

    if (usePreview) {
      setPersistentValue('current_chat_uid', key)
      history.push('/chats')
    } else {
      history.push(`/chats/edit/${key}`)
    }
  }

  renderItem = (index, key) => {
    const { users, intl, auth } = this.props

    const user = users[index].val

    //We hide ourselfe to not create a chat with ourself
    if (user.uid === auth.uid) {
      return <div key={key} />
    }

    return (
      <div key={key}>
        <ListItem
          key={key}
          onClick={() => {
            this.handleRowClick(users[index])
          }}
          id={key}
        >
          <AltIconAvatar src={user.photoURL} icon={<Person/>} />

          <ListItemText
            primary={user.displayName}
            secondary={
              !user.connections && !user.lastOnline
                ? intl.formatMessage({ id: 'offline' })
                : intl.formatMessage({ id: 'online' })
            }
          />
        </ListItem>
        <Divider variant='inset' />
      </div>
    )
  }

  render() {
    const { intl, isLoading, theme, users } = this.props

    return (
      <Activity
        title={intl.formatMessage({ id: 'users' })}
        onBackClick={() => history.back()}
        appBarContent={
          <div style={{ display: 'flex' }}>
            <SearchField filterName={'select_user'} />
          </div>
        }
        isLoading={isLoading}
      >
        <div style={{ height: '100%', overflow: 'none', backgroundColor: theme.palette.convasColor }}>
          <Scrollbar>
            <List
              id="test"
              ref={field => {
                this.users = field
              }}
            >
              <ReactList itemRenderer={this.renderItem} length={users ? users.length : 0} type="simple" />
            </List>
          </Scrollbar>
        </div>
      </Activity>
    )
  }
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  
  theme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const { auth, filters } = state
  const { width } = ownProps

  const { hasFilters } = filterSelectors.selectFilterProps('select_user', filters)
  const users = filterSelectors.getFilteredList(
    'select_user',
    filters,
    getList(state, 'users'),
    fieldValue => fieldValue.val
  )
  const usePreview = isWidthUp('sm', width)

  return {
    usePreview,
    hasFilters,
    isLoading: isLoading(state, 'users'),
    users,
    auth
  }
}


export default compose(
  connect(mapStateToProps, { ...filterActions,setPersistentValue }),
  injectIntl,
  withFirebase,
  withRouter,
  withWidth(),
  withTheme,
)(Users)

