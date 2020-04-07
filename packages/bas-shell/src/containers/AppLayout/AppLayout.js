import React, { Suspense } from 'react'
import Routes from '../../containers/Routes/Routes'
import withConfig from '../../providers/ConfigProvider/withConfig'

export const AppLayout = ({ appConfig, intl }) => {
  const { components } = appConfig || {}
  const { Menu, Loading } = components || {}

  return (
    <React.Fragment>
      {Menu && <Menu />}
      <Suspense fallback={<Loading />}>
        <Routes />
      </Suspense>
    </React.Fragment>
  )
}

export default withConfig(AppLayout)
