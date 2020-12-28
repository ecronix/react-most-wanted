import AccountBox from '@material-ui/icons/AccountBox'
import Activity from '../../containers/Activity'
import Add from '@material-ui/icons/Add'
import AltIconAvatar from '../../components/AltIconAvatar'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import React, { Component } from 'react'
import ReactList from 'react-list'
import Scrollbar from '../../components/Scrollbar/Scrollbar'
import { Fab } from '@material-ui/core'
import { connect } from 'react-redux'
import { getList, isLoading } from 'firekit'
import { injectIntl } from 'react-intl'
import { withFirebase } from 'firekit-provider'
import { withRouter } from 'react-router-dom'

const path = 'roles'

export class Roles extends Component {
  componentDidMount() {
    const { watchList } = this.props

    watchList(path)
  }

  handleCreateClick = () => {
    const { firebaseApp, history } = this.props

    const newRole = firebaseApp
      .database()
      .ref(`/${path}`)
      .push()

    newRole.update({ name: 'New Role' }).then(() => {
      history.push(`/${path}/edit/${newRole.key}/main`)
    })
  }

  renderItem = i => {
    const { list, history } = this.props

    const key = list[i].key
    const val = list[i].val

    return (
      <div key={key}>
        <ListItem
          key={i}
          onClick={() => {
            history.push(`/${path}/edit/${key}/main`)
          }}
          id={i}
        >
          <AltIconAvatar icon={<AccountBox />} />
          <ListItemText primary={val.name} secondary={val.description} />
        </ListItem>
        <Divider variant='inset' />
      </div>
    )
  }

  render() {
    const { intl, list, isLoading } = this.props

    return (
      <Activity isLoading={isLoading} title={intl.formatMessage({ id: 'roles' })}>
        <div style={{ height: '100%' }}>
          <Scrollbar>
            <List
              ref={field => {
                this.list = field
              }}
            >
              <ReactList itemRenderer={this.renderItem} length={list.length} type="simple" />
            </List>
          </Scrollbar>
          <div style={{ float: 'left', clear: 'both' }} />

          <div style={{ position: 'fixed', right: 18, zIndex: 3, bottom: 18 }}>
            <Fab color="secondary" onClick={this.handleCreateClick}>
              <Add className="material-icons" />
            </Fab>
          </div>
        </div>
      </Activity>
    )
  }
}

Roles.propTypes = {
  
}

const mapStateToProps = state => {
  return {
    list: getList(state, path),
    isLoading: isLoading(state, path)
  }
}

export default connect(mapStateToProps)(injectIntl(withFirebase(withRouter(Roles))))
