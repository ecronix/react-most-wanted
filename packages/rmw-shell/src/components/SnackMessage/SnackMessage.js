import React from 'react'
import { makeStyles } from '@mui/styles'
import { useSnackbar, SnackbarContent } from 'notistack'
import CloseIcon from '@mui/icons-material/Close'

import { Avatar, CardMedia, IconButton, Card, CardHeader } from '@mui/material'

import Notifications from '@mui/icons-material/Notifications'
import { useNavigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/styles'
import { createTheme } from '@mui/material/styles'
import { useTheme as useAppTheme } from 'material-ui-shell/lib/providers/Theme'

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      minWidth: '344px !important',
    },
    maxWidth: 400,
    cursor: 'pointer',
  },
  card: {
    width: '100%',
  },
}))

const SnackMessage = React.forwardRef((props, ref) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const { closeSnackbar } = useSnackbar()
  const { payload, id } = props
  const { notification } = payload
  const { title, body, icon, image, click_action } = notification || {}

  // const theme = useTheme()
  // const type = theme.palette.type === 'light' ? 'dark' : 'light'
  const { isDarkMode } = useAppTheme()

  const innerTheme = createTheme({
    palette: {
      type: isDarkMode ? 'light' : 'dark',
    },
  })

  const handleDismiss = () => {
    closeSnackbar(id)
  }

  const handleClick = () => {
    const url = new URL(click_action)
    navigate(url.pathname)
    handleDismiss()
  }

  return (
    <ThemeProvider theme={innerTheme}>
      <SnackbarContent ref={ref} className={classes.root}>
        <Card className={classes.card}>
          {image && (
            <CardMedia
              onClick={handleClick}
              style={{ height: 140 }}
              image={image}
              title={title}
            />
          )}
          <CardHeader
            avatar={
              <Avatar onClick={handleClick} src={icon} aria-label="recipe">
                <Notifications />
              </Avatar>
            }
            action={
              <IconButton
                onClick={handleDismiss}
                style={{ zIndex: 9999 }}
                className={classes.expand}
              >
                <CloseIcon />
              </IconButton>
            }
            title={<div onClick={handleClick}>{title}</div>}
            subheader={<div onClick={handleClick}>{body}</div>}
          />
        </Card>
      </SnackbarContent>
    </ThemeProvider>
  )
})

export default SnackMessage
