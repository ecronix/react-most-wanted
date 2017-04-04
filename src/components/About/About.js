import React, { Component } from 'react';
import { ResponsiveAppBar } from 'material-ui-responsive-drawer';
import {injectIntl, intlShape} from 'react-intl';
import {Helmet} from 'react-helmet';

class About extends Component {

  render() {

    const {intl}=this.props;

    return (
      <div>
        <Helmet>
          <title>{intl.formatMessage({id: 'about'})}</title>
        </Helmet>
        <ResponsiveAppBar
          title={intl.formatMessage({id: 'about'})}
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
