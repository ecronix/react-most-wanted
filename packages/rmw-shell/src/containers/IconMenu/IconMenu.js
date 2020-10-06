import IconButton from '@material-ui/core/IconButton'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import React from 'react'

export default function IconMenu({ icon, options = [], buttonStyle }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOptionClick = option => {
    const { onClick } = option

    if (onClick) {
      onClick()
    }

    handleClose()
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={buttonStyle}
      >
        {icon ? icon : <MoreVertIcon />}
      </IconButton>
      {open && (
        <Menu id="icon-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
          {options
            .filter(o => !o.hidden)
            .map((option, i) => (
              <MenuItem key={`option_${i}`} onClick={() => handleOptionClick(option)}>
                {option.icon && <ListItemIcon>{option.icon}</ListItemIcon>}
                {option.icon && <ListItemText primary={option.text} />}
              </MenuItem>
            ))}
        </Menu>
      )}
    </div>
  )
}
