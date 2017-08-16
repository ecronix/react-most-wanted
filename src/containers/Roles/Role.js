import React, {Component} from 'react';
import {connect} from 'react-redux';
import { injectIntl } from 'react-intl';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { Activity } from '../../containers/Activity'
import { ResponsiveMenu } from 'material-ui-responsive-menu';
import { FireForm } from 'firekit'
import { setDialogIsOpen } from '../../store/dialogs/actions';
import { withRouter } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { withFirebase } from 'firekit';
import { change, submit } from 'redux-form';
import RoleForm from '../../components/Forms/RoleForm';
import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Toggle from 'material-ui/Toggle';
import { grants } from '../../utils/auth';

const path='/roles';
const form_name='role';


class Role extends Component {


  validate = (values) => {
    const { intl } = this.props;
    const errors = {}

    errors.name = !values.name?intl.formatMessage({id: 'error_required_field'}):'';

    return errors
  }


  componentDidMount() {
    this.props.watchList('grants');
    this.props.watchList('role_grants');
  }


  handleClose = () => {
    const { setDialogIsOpen }=this.props;

    setDialogIsOpen('delete_role', false);

  }

  handleDelete = () => {

    const {history, match, firebaseApp}=this.props;
    const uid=match.params.uid;

    if(uid){
      firebaseApp.database().ref().child(`${path}/${uid}`).remove().then(()=>{
        this.handleClose();
        history.goBack();
      })
    }
  }

  hanldeGrantToggleChange = (e, isInputChecked, key) => {
    const { firebaseApp, match } = this.props;
    const uid=match.params.uid;

    if(isInputChecked){
      firebaseApp.database().ref(`/role_grants/${uid}/${key}`).set(true);
    }else{
      firebaseApp.database().ref(`/role_grants/${uid}/${key}`).remove();
    }

  }

  renderGrantItem = (i, k) => {
    const { role_grants, match, intl} =this.props;

    const uid=match.params.uid;
    const key=i;
    const val=grants[i];
    let roleGrants=[];

    if(role_grants!==undefined){
      role_grants.map(role=>{
        if(role.key===uid){
          if(role.val!==undefined){
            roleGrants=role.val;
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
            toggled={roleGrants[val]===true}
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
      dialogs,
      setDialogIsOpen,
      submit,
      muiTheme,
      match
    }=this.props;

    const uid=match.params.uid;

    const actions = [
      <FlatButton
        label={intl.formatMessage({id: 'cancel'})}
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label={intl.formatMessage({id: 'delete'})}
        secondary={true}
        onClick={this.handleDelete}
      />,
    ];

    const menuList=[
      {
        text: intl.formatMessage({id: 'save'}),
        icon: <FontIcon className="material-icons" color={muiTheme.palette.canvasColor}>save</FontIcon>,
        tooltip:intl.formatMessage({id: 'save'}),
        onClick: ()=>{submit('role')}
      },
      {
        hidden: uid===undefined,
        text: intl.formatMessage({id: 'delete'}),
        icon: <FontIcon className="material-icons" color={muiTheme.palette.canvasColor}>delete</FontIcon>,
        tooltip: intl.formatMessage({id: 'delete'}),
        onClick: ()=>{setDialogIsOpen('delete_role', true);}
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
        title={intl.formatMessage({
          id: this.props.match.params.uid?'edit_role':'create_role'})}>
          <div style={{margin: 15, display: 'flex'}}>
            <FireForm
              name={form_name}
              path={`${path}/`}
              validate={this.validate}
              onSubmitSuccess={(values)=>{history.push(`${path}`);}}
              onDelete={(values)=>{history.push(`${path}`);}}
              uid={this.props.match.params.uid}>
              <RoleForm
                renderGrantItem={this.renderGrantItem}
                {...this.props}
              />
            </FireForm>
          </div>
          <Dialog
            title={intl.formatMessage({id: 'delete_role_title'})}
            actions={actions}
            modal={false}
            open={dialogs.delete_role===true}
            onRequestClose={this.handleClose}>
            {intl.formatMessage({id: 'delete_role_message'})}
          </Dialog>
        </Activity>
      );
    }
  }


  const mapStateToProps = (state) => {
    const { auth, intl, dialogs, lists } = state;

    return {
      auth,
      intl,
      dialogs,
      role_grants: lists.role_grants
    };
  };

  export default connect(
    mapStateToProps, {setDialogIsOpen, change, submit}
  )(injectIntl(withRouter(withFirebase(muiThemeable()(Role)))));
