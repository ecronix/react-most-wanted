import Button from '@material-ui/core/Button'
import Page from 'material-ui-shell/lib/containers/Page'
import React, { useContext } from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import { useIntl } from 'react-intl'
import { useSimpleValues } from 'base-shell/lib/providers/SimpleValues'
import { useSnackbar } from 'notistack'

export default function () {
  const intl = useIntl()
  const { enqueueSnackbar } = useSnackbar()

  return (
    <Page
      pageTitle={intl.formatMessage({
        id: 'toast_demo',
        defaultMessage: 'Toast demo',
      })}
    >
      <br />
      <Button
        onClick={() => {
          enqueueSnackbar('Test', {
            variant: 'info',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
          })
        }}
      >
        OPEN Toast
      </Button>
    </Page>
  )
}
