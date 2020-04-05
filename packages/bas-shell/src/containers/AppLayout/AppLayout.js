import React, { Suspense } from 'react'
import Routes from '../../containers/Routes/Routes'
import withConfig from '../../providers/ConfigProvider/withConfig'

export const AppLayout = ({ appConfig, intl }) => {
  const { Menu = null, LoadingComponent = <div>Loading...</div> } =
    appConfig || {}
  return (
    <Suspense fallback={LoadingComponent}>
      {<Menu />}
      <Suspense fallback={LoadingComponent}>
        <Routes />
      </Suspense>
    </Suspense>
  )
}

export default withConfig(AppLayout)
