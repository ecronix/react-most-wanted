import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { injectIntl, intlShape } from 'react-intl';
import { GitHubIcon } from '../../components/Icons';
import { Activity } from '../../components/Activity'

const Dashboard = ({intl}) => {

  return (
    <Activity
      iconElementRight={
        <FlatButton
          href="https://github.com/TarikHuber/react-most-wanted"
          target="_blank"
          rel="noopener"
          secondary={true}
          icon={<GitHubIcon/>}
        />
      }
      title={intl.formatMessage({id: 'dashboard'})}>

    </Activity>
  );

}

Dashboard.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Dashboard);
