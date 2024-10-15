import { Typography } from '@mui/material'
import { Page } from '@ecronix/material-ui-shell'
import React from 'react'
import { useIntl } from 'react-intl'

export const HomePage = () => {
  const intl = useIntl()

  return (
    <Page pageTitle={intl.formatMessage({ id: 'home' })}>
      <Typography>{intl.formatMessage({ id: 'home' })}</Typography>
    </Page>
  )
}
