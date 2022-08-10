import { Button, Paper, Typography } from '@mui/material'
import { Home } from '@mui/icons-material'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import React from 'react'
import { useIntl } from 'react-intl'

const PageNotFound = () => {
  const intl = useIntl()

  return (
    <Page pageTitle={intl.formatMessage({ id: 'page_not_found' }) + ' MUI'}>
      <Paper
        sx={{
          backgroundColor: (t) => t.palette.background.default,
          margin: 0,
          height: `calc(100vh - 64px)`,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: `100%`,
          }}
        >
          <Typography variant="h4">404</Typography>
          <Typography variant="subtitle1">
            {intl.formatMessage({ id: 'page_not_found' }) + ' MUI'}
          </Typography>
          <Button
            color="secondary"
            aria-label="home"
            href="/"
            style={{ marginTop: 20 }}
          >
            <Home />
          </Button>
        </div>
      </Paper>
    </Page>
  )
}

export default PageNotFound
