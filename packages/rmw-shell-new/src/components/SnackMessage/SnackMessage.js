import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSnackbar, SnackbarContent } from 'notistack'
import Collapse from '@material-ui/core/Collapse'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import Avatar from '@material-ui/core/Avatar'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import Notifications from '@material-ui/icons/Notifications'
import { useHistory } from 'react-router-dom'
import { ThemeProvider, useTheme } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

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
  const history = useHistory()
  const theme = useTheme()
  const { closeSnackbar } = useSnackbar()
  const { payload, id } = props
  const { notification } = payload
  const { title, body, icon, image, click_action } = notification || {}

  const type = theme.palette.type === 'light' ? 'dark' : 'light'

  const innerTheme = createMuiTheme({
    palette: {
      type,
    },
  })

  const handleDismiss = () => {
    closeSnackbar(id)
  }

  const handleClick = () => {
    history.push(click_action)
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
