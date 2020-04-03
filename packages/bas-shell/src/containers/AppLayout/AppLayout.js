import React from 'react'
import Routes from '../../containers/Routes/Routes'
import withConfig from '../../providers/ConfigProvider/withConfig'

export const AppLayout = ({ appConfig, intl }) => {
  return (
    <div>
      <div>MENU</div>
      <Routes />
    </div>
  )
}

export default withConfig(AppLayout)
