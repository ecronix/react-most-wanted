import React from 'react';
import {injectIntl, intlShape} from 'react-intl';
import { Activity } from '../../containers/Activity';

export const About = ({intl}) => {

  return (
    <Activity
      title={intl.formatMessage({id: 'about'})}>


    </Activity>
  );

}

About.propTypes = {
  intl: intlShape.isRequired,
};


export default injectIntl(About);
