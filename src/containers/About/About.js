import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { injectIntl, intlShape } from 'react-intl';
import { GitHubIcon } from '../../components/Icons';
import { Activity } from '../../containers/Activity';
import {MarkdownElement} from '../../components/MarkdownElement';

import readMe from './about.md.js';

const About = ({intl}) => {

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
      title={intl.formatMessage({id: 'about'})}>

      <div style={{backgroundColor: 'white', marginTop: -20}}>
        <MarkdownElement  text={readMe}  style={{padding: 15}}/>
      </div>

    </Activity>
  );

}

About.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(About);
