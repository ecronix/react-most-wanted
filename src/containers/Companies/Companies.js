import React, {Component} from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {injectIntl, intlShape} from 'react-intl';
import { Activity } from '../../containers/Activity';
import ListActions from '../../firebase/list/actions';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {withRouter} from 'react-router-dom';
import Avatar from 'material-ui/Avatar';

class Vehicles extends Component {

  componentDidMount() {
    const {initialiseList}=this.props;
    initialiseList();
  }

  componentWillUnmount() {
    const {unsubscribeList}=this.props;
    unsubscribeList();
  }

  renderList(companies) {
    const {history} =this.props;

    return _.map(companies.list, (row, key) => {

      return <div key={key}>
        <ListItem
          leftAvatar={
            <Avatar
              src={row.photoURL}
              alt="bussines"
              icon={
                <FontIcon className="material-icons">
                  business
                </FontIcon>
              }
            />
          }
          key={key}
          primaryText={row.name}
          secondaryText={row.full_name}
          onTouchTap={()=>{history.push(`/companies/edit/${key}`)}}
          id={key}
        />
        <Divider inset={true}/>
      </div>
    });
  }


  render(){
    const {intl, companies, muiTheme, history} =this.props;

    return (
      <Activity
        isLoading={companies.isFetching}
        containerStyle={{overflow:'hidden'}}
        title={intl.formatMessage({id: 'companies'})}>

        <div id="scroller" style={{overflow: 'auto', height: '100%'}}>

          <div style={{overflow: 'none', backgroundColor: muiTheme.palette.convasColor}}>
            <List  id='test' style={{height: '100%'}} ref={(field) => { this.list = field; }}>
              {this.renderList(companies)}
            </List>
          </div>

          <div style={{position: 'fixed', right: 18, zIndex:3, bottom: 18, }}>
            <FloatingActionButton secondary={true} onTouchTap={()=>{history.push(`/companies/create`)}} style={{zIndex:3}}>
            <FontIcon className="material-icons" >add</FontIcon>
          </FloatingActionButton>
        </div>
      </div>
    </Activity>
  );

}

}

Vehicles.propTypes = {
  intl: intlShape.isRequired,
  muiTheme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const actions = new ListActions('companies').createActions();

const mapStateToProps = (state) => {
  const { companies, auth, browser } = state;

  return {
    companies,
    auth,
    browser,
  };
};


export default connect(
  mapStateToProps,
  {
    ...actions
  }
)(injectIntl(muiThemeable()(withRouter(Vehicles))));
