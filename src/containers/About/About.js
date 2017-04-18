import React from 'react';
import { ResponsiveAppBar } from 'material-ui-responsive-drawer';
import {injectIntl, intlShape} from 'react-intl';
import {Helmet} from 'react-helmet';

export const About = ({intl}) => {

  return (
    <div >
      <Helmet>
        <title>{intl.formatMessage({id: 'about'})}</title>
      </Helmet>
      <ResponsiveAppBar
        title={intl.formatMessage({id: 'about'})}
      />
      <div >

      </div>
    </div>
  );

}

About.propTypes = {
  intl: intlShape.isRequired,
};


export default injectIntl(About);
