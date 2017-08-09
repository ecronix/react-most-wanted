import React from 'react';
import IconButton from 'material-ui/IconButton';

const ActionToggleButton = (props) => {
    const { isToggled, getIcon, onTouchTap, meta, input,  ...rest } = props;
    const { value } = input;
    const toggled=isToggled(value);

    return <IconButton
      onTouchTap={()=>{onTouchTap(toggled)}}
      {...rest}>
      {getIcon(toggled)}
    </IconButton>

  }

export default ActionToggleButton;
