import React from 'react'
import { useIntl } from 'react-intl'
import { useLoader } from 'base-shell/lib/providers/Loader'

const loaderName = 'loaderDemoPage'
const loaderName2 = 'loaderDemoPage2'

function sleep() {
  return new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });
}

const LoaderDemoPage = () => {
  const intl = useIntl()
  const { getLoadingPool, getLoader, loading, loaded, loadedWithError } = useLoader()
  const loader = getLoader(loaderName)
  const loader2 = getLoader(loaderName2)
  return <div>
    <br />
    number of active loading: {getLoadingPool()} {loader2.type}
    <br />
    <br />
   Loader name: {loaderName}, is loading:
      <span style={loader.ok === false ? { color: 'red' } : { color: 'black' }}>
      {`${loader.isLoading ? 'true' : 'false'}`}
    </span>
    <br />loader text original: {loader.type}
    <br />
    <br />
    <button
      onClick={(e) => {
        loading(loaderName)
        sleep().then(() => loaded(loaderName))
      }}
    >
      start loading
      </button>
    <button
      onClick={(e) => {
        loading(loaderName)
        sleep().then(() => loadedWithError(loaderName))
      }}
    >
      start loading with error
      </button>
    <br />
    <br />
    Loader name: {loaderName2}, is loading:
      <span style={loader2.ok === false ? { color: 'red' } : { color: 'black' }}>
      {`${loader2.isLoading ? 'true' : 'false'}`}
    </span>
    <br />loader text with used intl: {intl.formatMessage({ id: loader2.type, defaultMessage: loader2.type })}
    <br />
    <br />
    <button
      onClick={(e) => {
        loading(loaderName2)
        sleep().then(() => loaded(loaderName2))
      }}
    >
      start loading
      </button>
    <br />
    <br />
  </div >
}
export default LoaderDemoPage
