import React from 'react'
import { FormPage } from 'rmw-shell/lib/containers/Page'
import { useParams, useHistory } from 'react-router-dom'

export default function () {
  const { uid } = useParams()

  return (
    <FormPage
      path="companies"
      uid={uid}
      getPageProps={(values) => {
        return { pageTitle: 'Companies' }
      }}
    />
  )
}
