import React from 'react'
import { useIntl } from 'react-intl'
import { useLoader } from 'base-shell/lib/providers/Loader'

const loaderName = 'LoaderDemoPage'
const loaderName2 = 'LoaderDemoPage2'

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
    number of active loading: {getLoadingPool()}
    <br />
    <br />
   Loader name: {loaderName}, is loading: 
      <span style={loader.ok === false ? { color: 'red' } : { color: 'black' }}>
      {`${loader.isLoading ? 'true' : 'false'}`}
    </span>
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
