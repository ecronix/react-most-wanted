import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {fade} from 'material-ui/utils/colorManipulator';


const Scrollbar = (props) => {
  const {  muiTheme, ...rest } = props;

  const thumbStyle = {
    backgroundColor: fade(muiTheme.palette.primary1Color, 0.65),
    borderRadius: 3
  };

  return (
    <Scrollbars
      renderThumbVertical={({ style, ...p }) => <div style={{...style, ...thumbStyle}} {...p} />}
      {...rest}
    />
  );

}

export default muiThemeable()(Scrollbar);
