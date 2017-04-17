import React from 'react';
import { ResponsiveAppBar } from 'material-ui-responsive-drawer';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {injectIntl, intlShape} from 'react-intl';
import {Helmet} from 'react-helmet';

const MyAccount = ({intl}) => {

  return (
    <div >
      <Helmet>
        <title>{intl.formatMessage({id: 'my_account'})}</title>
      </Helmet>
      <ResponsiveAppBar
        title={intl.formatMessage({id: 'my_account'})}
      />
      <div >

      </div>
    </div>
  );

}

MyAccount.propTypes = {
  intl: intlShape.isRequired,
};


export default injectIntl(muiThemeable()(MyAccount));
