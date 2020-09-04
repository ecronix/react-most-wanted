import React, { useContext } from 'react'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import QuestionDialog from 'material-ui-shell/lib/containers/QuestionDialog/QuestionDialog'
import SimpleValuesContext from 'base-shell/lib/providers/SimpleValues/Context'
import { useIntl } from 'react-intl'
import Button from '@material-ui/core/Button'

const DIALOG_ID = 'demo_dialog'

const HomePage = () => {
  const intl = useIntl()
  const { setValue } = useContext(SimpleValuesContext)

  return (
    <Page
      pageTitle={intl.formatMessage({
        id: 'dialog_demo',
        defaultMessage: 'Dialog demo',
      })}
    >
      <br />
      <Button
        onClick={() => {
          setValue(DIALOG_ID, true)
        }}
      >
        OPEN DIALOG
      </Button>
      <QuestionDialog
        id={DIALOG_ID}
        title={intl.formatMessage({
          id: 'dialog_title',
          defaultMessage: 'Dialog title',
        })}
        message={intl.formatMessage({
          id: 'dialog_message',
          defaultMessage:
            'Dialog message. You can put as much text as you want here. Ask a question or show a warning befor deleting something. You can also set the action text to somerhing like "YES, Delete" and run that action by passing a "handleAction" prop. This receives a "handleClose" callback with wich you can close the dialog when your action is done.',
        })}
        action={intl.formatMessage({
          id: 'dialog_action',
          defaultMessage: 'YES, Delete',
        })}
        handleAction={(handleClose) => {
          //Do some stuff and then
          handleClose()
        }}
      />
    </Page>
  )
}
export default HomePage
