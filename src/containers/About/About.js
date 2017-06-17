import React, { Component }  from 'react';
import {injectIntl, intlShape} from 'react-intl';
import { Activity } from '../../containers/Activity';
import { withFirebase } from 'firekit';

class About extends Component {

  render() {
    const { intl }= this.props;

    return (
      <Activity
        title={intl.formatMessage({id: 'about'})}>
      </Activity>
    );
  }

}

About.propTypes = {
  intl: intlShape.isRequired,
};


export default injectIntl(withFirebase(About));
