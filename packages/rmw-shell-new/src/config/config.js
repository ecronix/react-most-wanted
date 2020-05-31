import React, { lazy } from 'react'
import MUIConfig from 'material-ui-shell'
import merge from 'base-shell/lib/utils/config'

const config = {
  containers: {
    AppContainer: lazy(() => import('../containers/AppContainer/AppContainer')),
  },
  redux: {},
}

export default merge(MUIConfig, config)
