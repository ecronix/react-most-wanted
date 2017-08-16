import React from 'react';
import IconButton from 'material-ui/IconButton';

const ActionToggleButton = (props) => {
    const { isToggled, getIcon, onClick, meta, input,  ...rest } = props;
    const { value } = input;
    const toggled=isToggled(value);

    return <IconButton
      onClick={()=>{onClick(toggled)}}
      {...rest}>
      {getIcon(toggled)}
    </IconButton>

  }

export default ActionToggleButton;
