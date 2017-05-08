import React, {Component} from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {injectIntl, intlShape} from 'react-intl';
import { Activity } from '../../components/Activity';
import * as usersActions from '../../store/users/actions';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';

const styles={
  center_container:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: 16,
  },
}

class Users extends Component {

  componentWillMount() {
    this.props.requestLoad();
  }

  componentWillUnmount() {
    this.props.requestUnload();
  }

  rednerList(users) {
    const {intl} =this.props;

    return _.map(users.list, (user, key) => {
      return <div key={key}>
        <ListItem
          key={key}
          id={key}
          leftAvatar={<Avatar src={user.photoURL} />}
          rightIcon={<FontIcon className="material-icons" color={user.connections?'green':'red'}>offline_pin</FontIcon>}
          primaryText={user.displayName}
          secondaryTextLines={1}
          secondaryText={<p>
            {(!user.connections && !user.lastOnline)?intl.formatMessage({id: 'offline'}):intl.formatMessage({id: 'online'})}
            {' '}
            {(!user.connections && user.lastOnline)?intl.formatRelative(new Date(user.lastOnline)):undefined}
          </p>}
        />
        <Divider inset={true}/>
      </div>
    });
  }


  render(){
    const {intl, users, muiTheme} =this.props;

    return (
      <Activity
        title={intl.formatMessage({id: 'users'})}>
        <div >
          {users.isFetching && users.isConnected && !Object.keys(users.list).length &&
            <div style={styles.center_container}>
              <CircularProgress  style={{padding: 20}} size={80} thickness={5} />
            </div>
          }

          <div style={{overflow: 'none', backgroundColor: muiTheme.palette.convasColor}}>
            <List  id='test' style={{height: '100%'}} ref={(field) => { this.list = field; }}>
              {this.rednerList(users)}
            </List>
          </div>

        </div>


      </Activity>
    );

  }

}

Users.propTypes = {
  intl: intlShape.isRequired,
  muiTheme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  requestLoad: PropTypes.func.isRequired,
  requestCreate: PropTypes.func.isRequired,
  requestUnload: PropTypes.func.isRequired,
  requestDelete: PropTypes.func.isRequired,
  setIsCreating: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { users, auth } = state;
  return {
    users,
    auth
  };
};


export default connect(
  mapStateToProps,
  {
    ...usersActions
  }
)(injectIntl(muiThemeable()(Users)));
