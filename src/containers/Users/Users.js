import React, {Component} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import muiThemeable from 'material-ui/styles/muiThemeable'
import {injectIntl, intlShape} from 'react-intl'
import { Activity } from '../../containers/Activity'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon'
import { withRouter } from 'react-router-dom'
import {GoogleIcon, FacebookIcon, GitHubIcon, TwitterIcon} from '../../components/Icons'
import { withFirebase } from 'firekit-provider'
import ReactList from 'react-list'
import { FilterDrawer, filterSelectors, filterActions } from 'material-ui-filter'
import Scrollbar from '../../components/Scrollbar/Scrollbar'
import SearchField from '../../components/SearchField/SearchField'
import { ResponsiveMenu } from 'material-ui-responsive-menu'


const path = `users`

class Users extends Component {

  componentDidMount() {
    this.props.watchList(path);
  }

  getProviderIcon = (provider) => {
    const { muiTheme } = this.props;
    const color = muiTheme.palette.primary2Color;

    switch (provider.providerId) {
      case 'google.com':
      return <GoogleIcon color={color}/>
      case 'facebook.com':
      return <FacebookIcon color={color}/>
      case 'twitter.com':
      return <TwitterIcon color={color}/>
      case 'github.com':
      return <GitHubIcon color={color}/>
      case 'phone':
      return <FontIcon className="material-icons" color={color} >phone</FontIcon>
      case 'password':
      return <FontIcon className="material-icons" color={color} >email</FontIcon>
      default:
      return undefined
    }
  }

  handleRowClick = (user) => {
    const { history, isSelecting } = this.props
    history.push(isSelecting?`/${isSelecting}/${user.key}`:`/${path}/edit/${user.key}/profile`)
  }


  renderItem = (index, key) => {
    const { list, intl, muiTheme } = this.props
    const user = list[index].val

    return <div key={key}>
      <ListItem
        key={key}
        id={key}
        onClick={()=>{this.handleRowClick(list[index])}}
        leftAvatar={<Avatar style={{marginTop: 10}} src={user.photoURL} alt="person" icon={<FontIcon className="material-icons" >person</FontIcon>}/>}
        rightIcon={<FontIcon style={{marginTop: 22}} className="material-icons" color={user.connections?muiTheme.palette.primary1Color:muiTheme.palette.disabledColor}>offline_pin</FontIcon>}>

        <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'strech'}}>
          <div style={{display: 'flex', flexDirection:'column', width: 120}}>
            <div>
              {user.displayName}
            </div>
            <div
              style={{
                fontSize: 14,
                lineHeight: '16px',
                height: 16,
                margin: 0,
                marginTop: 4,
                color: muiTheme.listItem.secondaryTextColor,
              }}>
              {(!user.connections && !user.lastOnline)?intl.formatMessage({id: 'offline'}):intl.formatMessage({id: 'online'})}
              {' '}
              {(!user.connections && user.lastOnline)?intl.formatRelative(new Date(user.lastOnline)):undefined}
            </div>
          </div>

          <div style={{marginLeft: 20, display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
            {user.providerData && user.providerData.map(
              (p, i)=>{
                return (
                  <div key={i} style={{paddingLeft: 10}}>
                    {this.getProviderIcon(p)}
                  </div>
                )
              })
            }
          </div>
        </div>

      </ListItem>
      <Divider inset={true}/>
    </div>
  }

  render(){
    const {
      list,
      muiTheme,
      setSearch,
      intl,
      setFilterIsOpen,
      hasFilters
    } = this.props

    const menuList=[
      {
        text: intl.formatMessage({id: 'open_filter'}),
        icon: <FontIcon className="material-icons" color={hasFilters?muiTheme.palette.accent1Color:muiTheme.palette.canvasColor}>filter_list</FontIcon>,
        tooltip:intl.formatMessage({id: 'open_filter'}),
        onClick: ()=>{setFilterIsOpen('users', true)}
      }
    ]

    const filterFields = [
      {
        name: 'displayName',
        label: intl.formatMessage({id: 'name'})
      },
      {
        name: 'email',
        label: intl.formatMessage({id: 'email_label'})
      }
    ];

    return (
      <Activity
        iconStyleLeft={{width: 'auto'}}
        iconStyleRight={{width: '100%', textAlign: 'center', marginLeft: 0}}
        iconElementRight={
          <div style={{display: 'flex'}}>
            <div style={{width: 'calc(100% - 84px)'}}>
              <SearchField
                onChange={(e, newVal) => {
                  setSearch('users', newVal)
                }}
                hintText={`${intl.formatMessage({id: 'user_label'})} ${intl.formatMessage({id: 'search'})}`}
              />
            </div>
            <div style={{position: 'absolute', right: 10, width: 100}}>
              <ResponsiveMenu
                iconMenuColor={muiTheme.palette.canvasColor}
                menuList={menuList}
              />
            </div>
          </div>
        }
        isLoading={list===undefined}>
        <div style={{height: '100%', overflow: 'none', backgroundColor: muiTheme.palette.convasColor}}>
          <Scrollbar>
            <List id='test' ref={field => this.list = field}>
              <ReactList
                itemRenderer={this.renderItem}
                length={list?list.length:0}
                type='simple'
              />
            </List>
          </Scrollbar>
        </div>
        <FilterDrawer
          name={'users'}
          fields={filterFields}
          formatMessage={intl.formatMessage}
        />
      </Activity>
    )
  }
}

Users.propTypes = {
  users: PropTypes.array,
  intl: intlShape.isRequired,
  muiTheme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const { lists, auth, filters } = state
  const { match } = ownProps

  const isSelecting = match.params.select?match.params.select:false

  const { hasFilters } = filterSelectors.selectFilterProps('companies', filters)
  const list = filterSelectors.getFilteredList('users', filters, lists[path], fieldValue => fieldValue.val)

  return {
    isSelecting,
    hasFilters,
    list,
    auth
  }
}


export default connect(
  mapStateToProps, { ...filterActions }
)(injectIntl(muiThemeable()(withFirebase(withRouter(Users)))));
