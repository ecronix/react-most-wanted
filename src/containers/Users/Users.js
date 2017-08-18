import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {injectIntl, intlShape} from 'react-intl';
import { Activity } from '../../containers/Activity';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import { withRouter } from 'react-router-dom';
import {GoogleIcon, FacebookIcon, GitHubIcon, TwitterIcon} from '../../components/Icons';
import IconButton from 'material-ui/IconButton';
import { withFirebase } from 'firekit';
import ReactList from 'react-list';
import { ResponsiveMenu } from 'material-ui-responsive-menu';
import Scrollbar from '../../components/Scrollbar/Scrollbar';
import { FilterDrawer, filterSelectors, filterActions } from 'material-ui-filter'


const path=`users`;

class Users extends Component {

  componentDidMount() {
    this.props.watchList(path);
  }

  getProviderIcon = (provider) => {

    const {muiTheme} =this.props;

    const color=muiTheme.palette.primary2Color;

    switch (provider.providerId) {
      case 'google.com':
      return <IconButton key={provider.providerId}>
        <GoogleIcon color={color}/>
      </IconButton>
      case 'facebook.com':
      return <IconButton key={provider.providerId}>
        <FacebookIcon color={color}/>
      </IconButton>
      case 'twitter.com':
      return <IconButton key={provider.providerId}>
        <TwitterIcon color={color}/>
      </IconButton>
      case 'github.com':
      return <IconButton   key={provider.providerId}>
        <GitHubIcon color={color}/>
      </IconButton>
      case 'phone':
      return <IconButton   key={provider.providerId} >
        <FontIcon className="material-icons" color={color} >phone</FontIcon>
      </IconButton>
      case 'password':
      return <IconButton   key={provider.providerId}>
        <FontIcon className="material-icons" color={color} >email</FontIcon>
      </IconButton>
      default:
      return undefined;
    }
  }

  handleRowClick = (user) => {
    const {history} =this.props;

    /*
    const chatsRef=firebaseApp.database().ref(`/chats`);
    const newChatRef=chatsRef.push();

    newChatRef.update({[auth.uid]:true});
    newChatRef.update({[user.key]:true});
    */

    history.push(`${path}/edit/${user.key}`);
  }


  renderItem = (index, key) => {
    const { list, intl, muiTheme} =this.props;

    const user=list[index].val;

    return <div key={key}>
      <ListItem
        key={key}
        id={key}
        onClick={()=>{this.handleRowClick(list[index])}}
        leftAvatar={<Avatar src={user.photoURL} alt="person" icon={<FontIcon className="material-icons" >person</FontIcon>}/>}
        rightIcon={<FontIcon className="material-icons" color={user.connections?'green':'red'}>offline_pin</FontIcon>}>

        <div style={{display: 'flex'}}>
          <div>
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
              <p>
                {(!user.connections && !user.lastOnline)?intl.formatMessage({id: 'offline'}):intl.formatMessage({id: 'online'})}
                {' '}
                {(!user.connections && user.lastOnline)?intl.formatRelative(new Date(user.lastOnline)):undefined}
              </p>
            </div>

          </div>

          <div style={{alignSelf: 'center', flexDirection: 'row', display: 'flex'}}>
            {user.providerData && user.providerData.map(
              (p)=>{
                return this.getProviderIcon(p);
              })
            }
          </div>
        </div>

      </ListItem>
      <Divider inset={true}/>
    </div>;
  }

  render(){
    const {
      intl,
      list,
      muiTheme,
      setFilterIsOpen,
      hasFilters,
    } =this.props;

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
        label: intl.formatMessage({id: 'name_label'})
      },
      {
        name: 'email',
        label: intl.formatMessage({id: 'email_label'})
      }
    ]

    return (
      <Activity
        iconStyleRight={{width:'50%'}}
        iconElementRight={
          <div>
            <ResponsiveMenu
              iconMenuColor={muiTheme.palette.canvasColor}
              menuList={menuList}
            />
          </div>
        }
        isLoading={list===undefined}
        title={intl.formatMessage({id: 'users'})}>
        <div style={{height: '100%', overflow: 'none', backgroundColor: muiTheme.palette.convasColor}}>
          <Scrollbar>
            <List id='test' ref={(field) => { this.list = field; }}>
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
    );
  }
}

Users.propTypes = {
  users: PropTypes.array,
  intl: intlShape.isRequired,
  muiTheme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { lists, auth, filters } = state;

  const { hasFilters } = filterSelectors.selectFilterProps('users', filters);
  const list = filterSelectors.getFilteredList('users', filters, lists[path], fieldValue => fieldValue.val);

  return {
    hasFilters,
    list,
    auth
  };
};


export default connect(
  mapStateToProps, { ...filterActions }
)(injectIntl(muiThemeable()(withFirebase(withRouter(Users)))));
