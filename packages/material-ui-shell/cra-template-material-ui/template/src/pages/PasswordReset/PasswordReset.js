import Button from '@material-ui/core/Button'
import Page from 'material-ui-shell/lib/containers/Page'
import Paper from '@material-ui/core/Paper'
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(620 + theme.spacing(6))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    width: 192,
    height: 192,
    color: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: `100%`,
  },
}))

const PasswordReset = () => {
  const classes = useStyles()
  const intl = useIntl()
  const history = useHistory()
  const [username, setUsername] = useState('')
  function handleSubmit(event) {
    event.preventDefault()
    history.replace('/signin')
  }

  return (
    <Page
      pageTitle={intl.formatMessage({
        id: 'password_reset',
        defaultMessage: 'Password reset',
      })}
      onBackClick={() => {
        history.goBack()
      }}
    >
      <Paper className={classes.paper} elevation={6}>
        <div className={classes.container}>
          <Typography component="h1" variant="h5">
            {intl.formatMessage({
              id: 'password_reset',
              defaultMessage: 'Password reset',
            })}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              value={username}
              onInput={(e) => setUsername(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={intl.formatMessage({
                id: 'email',
                defaultMessage: 'E-Mail',
              })}
              name="email"
              autoComplete="email"
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {intl.formatMessage({
                id: 'password_reset',
                defaultMessage: 'Reset Password',
              })}
            </Button>
          </form>
        </div>
      </Paper>
    </Page>
  )
}

export default PasswordReset
