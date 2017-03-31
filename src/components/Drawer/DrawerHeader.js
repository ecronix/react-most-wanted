import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

const DrawerHeader = (props) => {

  const styles={
    header:{
      backgroundColor:props.muiTheme.palette.primary2Color,
      color: props.muiTheme.palette.alternateTextColor,
      padding: 1,
    },
    header_content:{
      marginLeft: 20
    }
  }

  return (
    <div style={styles.header}>
      <div style={styles.header_content}>
        <h3>Material-UI</h3>
      </div>
    </div>
  );
}

export default muiThemeable()(DrawerHeader);
