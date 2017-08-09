import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { Activity } from '../../containers/Activity'
import { ResponsiveMenu } from 'material-ui-responsive-menu';
import { FireForm } from 'firekit'
import { setDialogIsOpen } from '../../store/dialogs/actions';
import { withRouter } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import { withFirebase } from 'firekit';
import { change, submit } from 'redux-form';
import UserForm from '../../components/Forms/UserForm';
import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Toggle from 'material-ui/Toggle';
import { grants } from '../../utils/auth';

const path='/users';
const form_name='user';


class Role extends Component {


  componentWillMount() {
    this.props.watchList('roles');
    this.props.watchList('user_roles');
    this.props.watchList('user_grants');
    this.props.watchList('admins');
  }

  hanldeRoleToggleChange = (e, isInputChecked, key) => {
    const { firebaseApp, match } = this.props;
    const uid=match.params.uid;

    if(isInputChecked){
      firebaseApp.database().ref(`/user_roles/${uid}/${key}`).set(true);
    }else{
      firebaseApp.database().ref(`/user_roles/${uid}/${key}`).remove();
    }

  }

  hanldeGrantToggleChange = (e, isInputChecked, key) => {
    const { firebaseApp, match } = this.props;
    const uid=match.params.uid;

    if(isInputChecked){
      firebaseApp.database().ref(`/user_grants/${uid}/${key}`).set(true);
    }else{
      firebaseApp.database().ref(`/user_grants/${uid}/${key}`).remove();
    }

  }


  handleAdminChange = (e, isInputChecked) => {
    const { firebaseApp, match } = this.props;
    const uid=match.params.uid;

    if(isInputChecked){
      firebaseApp.database().ref(`/admins/${uid}`).set(true);
    }else{
      firebaseApp.database().ref(`/admins/${uid}`).remove();
    }

  }

  renderRoleItem = (i, k) => {
    const { roles, user_roles, match} =this.props;

    const uid=match.params.uid;
    const key=roles[i].key;
    const val=roles[i].val;
    let userRoles=[];

    if(user_roles!==undefined){
      user_roles.map(role=>{
        if(role.key===uid){
          if(role.val!==undefined){
            userRoles=role.val;
          }
        }
        return role;
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
    </div>;
  }

  renderGrantItem = (i, k) => {
    const { user_grants, match, intl} =this.props;

    const uid=match.params.uid;
    const key=i;
    const val=grants[i];
    let userGrants=[];

    if(user_grants!==undefined){
      user_grants.map(role=>{
        if(role.key===uid){
          if(role.val!==undefined){
            userGrants=role.val;
          }
        }
        return role;
      })
    }

    return <div key={key}>
      <ListItem
        leftAvatar={
          <Avatar
            alt="person"
            src={undefined}
            icon={<FontIcon className="material-icons" >checked</FontIcon>}
          />
        }
        rightToggle={
          <Toggle
            toggled={userGrants[val]===true}
            onToggle={(e, isInputChecked)=>{this.hanldeGrantToggleChange(e, isInputChecked, val)}}
          />
        }
        key={key}
        id={key}
        primaryText={intl.formatMessage({id: `grant_${val}`})}
        //secondaryText={val.description}
      />
      <Divider inset={true}/>
    </div>;
  }



  render() {

    const {
      history,
      intl,
      submit,
      muiTheme,
      match,
      admins
    }=this.props;

    const uid=match.params.uid;
    let isAdmin=false;

    if(admins!==undefined){
      for (let admin of admins) {
        if(admin.key===uid){
          isAdmin=true;
          break;
        }
      }
    }


    const menuList=[
      {
        hidden: true, //activate later if needed
        text: intl.formatMessage({id: 'save'}),
        icon: <FontIcon className="material-icons" color={muiTheme.palette.canvasColor}>save</FontIcon>,
        tooltip:intl.formatMessage({id: 'save'}),
        onTouchTap: ()=>{submit('role')}
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

        onBackClick={()=>{history.goBack()}}
        title={intl.formatMessage({id: 'edit_user'})}>
        <div style={{margin: 15, display: 'flex'}}>
          <FireForm
            name={form_name}
            path={`${path}/`}
            onSubmitSuccess={(values)=>{history.push(`${path}`);}}
            onDelete={(values)=>{history.push(`${path}`);}}
            uid={uid}>
            <UserForm
              renderRoleItem={this.renderRoleItem}
              renderGrantItem={this.renderGrantItem}
              handleAdminChange={this.handleAdminChange}
              isAdmin={isAdmin}
              {...this.props}
            />
          </FireForm>
        </div>
      </Activity>
    );
  }
}


Role.propTypes = {
  history: PropTypes.object,
  intl: intlShape.isRequired,
  submit: PropTypes.func.isRequired,
  muiTheme: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  admins: PropTypes.array.isRequired,
};


const mapStateToProps = (state) => {
  const { auth, intl, lists } = state;

  return {
    auth,
    intl,
    roles: lists.roles,
    user_roles: lists.user_roles,
    user_grants: lists.user_grants,
    admins: lists.admins
  };
};

export default connect(
  mapStateToProps, {setDialogIsOpen, change, submit}
)(injectIntl(withRouter(withFirebase(muiThemeable()(Role)))));
