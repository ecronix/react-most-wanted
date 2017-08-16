import React from 'react';
import IconButton from 'material-ui/IconButton';

const ToggleButton = (props) => {
  const { input, checkedIcon, uncheckedIcon, meta, ...rest } = props;
  const { value, onChange } = input;
  const isToggled=value===true;

  return <IconButton
    onClick={()=>{onChange(!isToggled)}}
    {...rest}>

    {isToggled && checkedIcon}
    {!isToggled && uncheckedIcon}
  </IconButton>

}

export default ToggleButton
