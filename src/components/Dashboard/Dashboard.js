import React, { Component } from 'react';
import { ResponsiveAppBar } from 'material-ui-responsive-drawer';
import FlatButton from 'material-ui/FlatButton';
import {injectIntl} from 'react-intl';
import {GitHubIcon} from '../Icons';
import {Helmet} from 'react-helmet';

class Dashboard extends Component {

  render() {

    const {intl}=this.props;

    return (
      <div>
        <Helmet>
          <title>{intl.formatMessage({id: 'dashboard'})}</title>
        </Helmet>
        <ResponsiveAppBar
          title={intl.formatMessage({id: 'dashboard'})}
          iconElementRight={
            <FlatButton
              href="https://github.com/TarikHuber/material-ui-responsive-drawer"
              target="_blank"
              rel="noopener"
              secondary={true}
              icon={<GitHubIcon/>}
            />
          }
        />
        <div style={{paddingTop:64}}>

        </div>
      </div>
    );
  }
}



export default injectIntl(Dashboard);
