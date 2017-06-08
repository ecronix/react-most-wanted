import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { injectIntl, intlShape } from 'react-intl';
import { GitHubIcon } from '../../components/Icons';
import { Activity } from '../../containers/Activity';
import {MarkdownElement} from '../../components/MarkdownElement';

import readMe from './dashboard.md.js';

const Dashboard = ({intl}) => {

  return (
    <Activity
      iconElementRight={
        <FlatButton
          style={{marginTop: 4}}
          href="https://github.com/TarikHuber/react-most-wanted"
          target="_blank"
          rel="noopener"
          secondary={true}
          icon={<GitHubIcon/>}
        />
      }
      title={intl.formatMessage({id: 'dashboard'})}>

      <div style={{backgroundColor: 'white', marginTop: -20}}>
        <MarkdownElement  text={readMe}  style={{padding: 15}}/>
      </div>

    </Activity>
  );

}

Dashboard.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Dashboard);
