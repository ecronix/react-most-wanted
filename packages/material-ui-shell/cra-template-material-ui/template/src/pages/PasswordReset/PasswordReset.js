import { Button, Typography } from '@mui/material'
import Page from 'material-ui-shell/lib/containers/Page'
import { useTheme } from '@mui/material/styles'
import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useIntl } from 'react-intl'
import CustomPaper from '../../components/CustomPaper'

const PasswordReset = () => {
  const intl = useIntl()
  const theme = useTheme()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/signin', { replace: true })
  }

  return (
    <Page
      pageTitle={intl.formatMessage({
        id: 'password_reset',
        defaultMessage: 'Password reset',
      })}
      onBackClick={() => {
        navigate(-1)
      }}
    >
      <CustomPaper elevation={6}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: `100%`,
          }}
        >
          <Typography component="h1" variant="h5">
            {intl.formatMessage({
              id: 'password_reset',
              defaultMessage: 'Password reset',
            })}
          </Typography>
          <form
            style={{ marginTop: theme.spacing(1) }}
            onSubmit={handleSubmit}
            noValidate
          >
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
              style={{ margin: theme.spacing(3, 0, 2) }}
            >
              {intl.formatMessage({
                id: 'password_reset',
                defaultMessage: 'Reset Password',
              })}
            </Button>
          </form>
        </div>
      </CustomPaper>
    </Page>
  )
}

export default PasswordReset
