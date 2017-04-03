import React, { Component } from 'react';
import { ResponsiveAppBar } from 'material-ui-responsive-drawer';
import FlatButton from 'material-ui/FlatButton';
import {injectIntl, intlShape} from 'react-intl';
import {GitHubIcon} from '../Icons'

class About extends Component {

  render() {

    const {intl}=this.props;

    return (
      <div>
        <ResponsiveAppBar
          title={intl.formatMessage({id: 'about'})}
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

        <div style={{margin:'10px'}}>


        </div>
      </div>
    );
  }
}



About.propTypes = {
  intl: intlShape.isRequired,
};


export default injectIntl(About);
