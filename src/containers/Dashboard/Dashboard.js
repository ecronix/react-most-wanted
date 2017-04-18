import React from 'react';
import { ResponsiveAppBar } from 'material-ui-responsive-drawer';
import FlatButton from 'material-ui/FlatButton';
import { injectIntl, intlShape } from 'react-intl';
import { GitHubIcon } from '../../components/Icons';
import { Helmet } from 'react-helmet';

const Dashboard = ({intl}) => {

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

Dashboard.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Dashboard);
