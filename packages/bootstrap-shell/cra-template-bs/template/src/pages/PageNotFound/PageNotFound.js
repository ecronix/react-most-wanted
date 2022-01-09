import React from 'react'
import { useIntl } from 'react-intl'

const PageNotFound = () => {
  const intl = useIntl()

  return (
    <div>
      <Typography variant="h4">404</Typography>
    </div>
  )
}

export default PageNotFound
