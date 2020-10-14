import Form from 'rmw-shell/lib/components/Forms/Role'
import React from 'react'
import { FormPage } from 'rmw-shell/lib/containers/Page'
import { useIntl } from 'react-intl'
import { useParams, useHistory } from 'react-router-dom'

const path = 'roles'
const singular = 'role'

export default function () {
  const history = useHistory()
  const intl = useIntl()
  const { uid } = useParams()

  return (
    <FormPage
      path={`${path}`}
      uid={uid}
      getPageProps={(values) => {
        return {
          pageTitle: intl.formatMessage({
            id: path,
            defaultMessage: 'Roles',
          }),
        }
      }}
      handleSubmit={(values, newUid) => {
        if (newUid) {
          history.replace(`/${path}/${newUid}`)
        } else {
          history.push(`/${path}`)
        }
      }}
      handleDelete={() => {
        history.push(`/${path}`)
      }}
      Form={Form}
      grants={{
        create: `create_${singular}`,
        delete: `delete_${singular}`,
      }}
      deleteDialogProps={{
        title: intl.formatMessage({
          id: `delete_${singular}_dialog_title`,
          defaultMessage: 'Delete Role?',
        }),
        message: intl.formatMessage({
          id: `delete_${singular}_dialog_message`,
          defaultMessage: 'Role will be deleted permanently?',
        }),
        action: intl.formatMessage({
          id: `delete_${singular}_dialog_action`,
          defaultMessage: 'DELETE ROLE',
        }),
      }}
    />
  )
}
