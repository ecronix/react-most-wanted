import React from 'react';
import { ResponsiveAppBar } from 'material-ui-responsive-drawer';
import {injectIntl, intlShape} from 'react-intl';
import {Helmet} from 'react-helmet';

const About = (props) => {

  const {intl}=props;

  return (
    <div>
      <Helmet>
        <title>{intl.formatMessage({id: 'about'})}</title>
      </Helmet>
      <ResponsiveAppBar
        title={intl.formatMessage({id: 'about'})}
      />
      <div>

      </div>
    </div>
  );

}



About.propTypes = {
  intl: intlShape.isRequired,
};


export default injectIntl(About);
