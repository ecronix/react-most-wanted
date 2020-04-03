import React from 'react'
import Loadable from 'react-loadable'

const LoadingComponent = ({ error }) => (
  <div>Loading...{error && JSON.stringify(error)}</div>
)

export default function asyncLoad(opts, preloadComponents) {
  return Loadable.Map({
    loader: {
      Component: opts.loader,
    },
    loading: LoadingComponent,

    render(loaded, props) {
      if (
        preloadComponents !== undefined &&
        preloadComponents instanceof Array
      ) {
        preloadComponents.map(component => component.preload())
      }

      const Component = loaded.Component.default

      return <Component {...props} />
    },
  })
}
