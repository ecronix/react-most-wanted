import Avatar from '@material-ui/core/Avatar'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import React from 'react'

const AltIconAvatar = props => {
  const { src, iconName, icon, ...rest } = props

  if (src) {
    return (
      <ListItemAvatar>
        <Avatar src={src} {...rest} />
      </ListItemAvatar>
    )
  } else {
    return (
      <ListItemAvatar>
        <Avatar {...rest}>{icon}</Avatar>
      </ListItemAvatar>
    )
  }
}

export default AltIconAvatar
