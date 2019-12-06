import React from 'react'
import IconButton from '@material-ui/core/IconButton'

const ToggleButton = props => {
  const { input, checkedIcon, uncheckedIcon, ...rest } = props
  const { value, onChange } = input
  const isToggled = value === true

  return (
    <IconButton onClick={() => onChange(!isToggled)} {...rest}>
      {isToggled && checkedIcon}
      {!isToggled && uncheckedIcon}
    </IconButton>
  )
}

export default ToggleButton
