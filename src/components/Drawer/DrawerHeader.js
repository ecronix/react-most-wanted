import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {injectIntl, intlShape} from 'react-intl';

const DrawerHeader = (props) => {

  const {muiTheme, intl}=props;

  const styles={
    header:{
      backgroundColor:muiTheme.palette.primary2Color,
      color: muiTheme.palette.alternateTextColor,
      padding: 1,
    },
    header_content:{
      marginLeft: 20
    }
  }

  return (
    <div style={styles.header}>
      <div style={styles.header_content}>
        <h3>{intl.formatMessage({id: 'app_name'})}</h3>
      </div>
    </div>
  );
}

DrawerHeader.propTypes = {
  intl: intlShape.isRequired,
};

export default muiThemeable()(injectIntl(DrawerHeader));
