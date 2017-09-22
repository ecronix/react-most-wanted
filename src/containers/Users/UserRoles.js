import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { setSimpleValue } from '../../store/simpleValues/actions';
import { withRouter } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import { withFirebase } from 'firekit';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Toggle from 'material-ui/Toggle';
import ReactList from 'react-list';
import { List } from 'material-ui/List';

class UserRoles extends Component {

  componentWillMount() {
    this.props.watchList('user_roles');
    this.props.watchList('roles');
  }

  hanldeRoleToggleChange = (e, isInputChecked, key) => {
    const { firebaseApp, match } = this.props
    const uid=match.params.uid

    if(isInputChecked){
      firebaseApp.database().ref(`/user_roles/${uid}/${key}`).set(true)
    }else{
      firebaseApp.database().ref(`/user_roles/${uid}/${key}`).remove()
    }

  }

  renderRoleItem = (i, k) => {
    const { roles, user_roles, match } = this.props

    const uid=match.params.uid
    const key=roles[i].key
    const val=roles[i].val
    let userRoles=[]

    if(user_roles!==undefined){
      user_roles.map(role=>{
        if(role.key===uid){
          if(role.val!==undefined){
            userRoles=role.val
          }
        }
        return role
      })
    }

    return <div key={key}>
      <ListItem
        leftAvatar={
          <Avatar
            alt="person"
            src={val.photoURL}
            icon={<FontIcon className="material-icons" >account_box</FontIcon>}
          />
        }
        rightToggle={
          <Toggle
            toggled={userRoles[key]===true}
            onToggle={(e, isInputChecked)=>{this.hanldeRoleToggleChange(e, isInputChecked, key)}}
          />
        }
        key={key}
        id={key}
        primaryText={val.name}
        secondaryText={val.description}
      />
      <Divider inset={true}/>
    </div>
  }

  render() {
    const { roles } = this.props;

    return (
      <div style={{height: '100%'}}>
          <List style={{height: '100%'}} >
            <ReactList
              itemRenderer={(i, k) => this.renderRoleItem(i, k)}
              length={roles?roles.length:0}
              type='simple'
            />
          </List>
      </div>
    );
  }
}


UserRoles.propTypes = {
  intl: intlShape.isRequired,
  muiTheme: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};


const mapStateToProps = (state, ownProps) => {
  const { auth, intl, lists, filters } = state;
  const { match } = ownProps

  const uid = match.params.uid

  return {
    filters,
    auth,
    uid,
    intl,
    user_roles: lists.user_roles,
    roles: lists.roles?lists.roles:[]
  }
}

export default connect(
  mapStateToProps, { setSimpleValue }
)(injectIntl(withRouter(withFirebase(muiThemeable()(UserRoles)))));
