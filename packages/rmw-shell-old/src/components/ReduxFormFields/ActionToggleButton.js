import React from 'react'
import IconButton from '@material-ui/core/IconButton'

const ActionToggleButton = props => {
  const { isToggled, getIcon, onClick, input, ...rest } = props
  const { value } = input
  const checked = isToggled(value)

  return (
    <IconButton onClick={() => onClick(checked)} {...rest}>
      {getIcon(checked)}
    </IconButton>
  )
}

export default ActionToggleButton
