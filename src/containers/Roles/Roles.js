import React, {Component} from 'react';
import { connect } from 'react-redux';
import {injectIntl, intlShape} from 'react-intl';
import { Activity } from '../../containers/Activity';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { withFirebase } from 'firekit';
import { withRouter } from 'react-router-dom';
import ReactList from 'react-list';
import Avatar from 'material-ui/Avatar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';

const path=`roles`;

class Roles extends Component {

  componentDidMount(){
    const {watchList} =this.props;

    watchList(path);
  }

  handleCreateClick = () => {
    const { firebaseApp, history} =this.props;

    const newRole=firebaseApp.database().ref(`${path}`).push();

    newRole.update({description: ' '}).then(()=>{
      history.push(`${path}/edit/${newRole.key}`);
    })

  }

  renderItem = (i, k) => {
    const { list, history} =this.props;

    const key=list[i].key;
    const val=list[i].val;

    return <div key={key}>
      <ListItem
        leftAvatar={
          <Avatar
            alt="person"
            src={val.photoURL}
            icon={<FontIcon className="material-icons" >account_box</FontIcon>}
          />
        }
        onClick={()=>{history.push(`${path}/edit/${key}`)}}
        key={key}
        id={key}
        primaryText={val.name}
        secondaryText={val.description}
      />
      <Divider inset={true}/>
    </div>;
  }

  render(){
    const {intl, list } =this.props;


    return (
      <Activity
        isLoading={list===undefined}
        title={intl.formatMessage({id: 'roles'})}>

        <div >
          <List style={{height: '100%'}} ref={(field) => { this.list = field; }}>
            <ReactList
              itemRenderer={this.renderItem}
              length={list?list.length:0}
              type='simple'
            />
          </List>
          <div
            style={{ float:"left", clear: "both" }}
          />
          <FloatingActionButton
            onClick={this.handleCreateClick}
            style={{position: 'fixed', bottom:15, right: 20, zIndex: 99}}
            secondary={true}>
            <FontIcon className="material-icons" >add</FontIcon>
          </FloatingActionButton>
        </div>

      </Activity>

    );

  }

}

Roles.propTypes = {
  intl: intlShape.isRequired,
};

const mapStateToProps = (state) => {
  const { lists } = state;

  return {
    list: lists[path]
  };
};


export default connect(
  mapStateToProps
)(injectIntl(withFirebase(withRouter(Roles))));
