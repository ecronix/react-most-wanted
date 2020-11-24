import Add from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import ListPage from 'material-ui-shell/lib/containers/Page/ListPage'
import React, { useEffect } from 'react'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useLists } from 'rmw-shell/lib/providers/Firebase/Lists'

const Page = ({
  fields = [],
  path = 'none',
  getRef = false,
  Row,
  listProps = {},
  getPageProps = () => {},
  onCreateClick = () => {},
  createGrant,
}) => {
  const {
    watchList,
    getList,
    isListLoading,
    unwatchList,
    firebaseApp,
  } = useLists()
  const { auth } = useAuth()
  const { isGranted = () => false } = auth || {}

  useEffect(() => {
    let ref = path

    if (getRef) {
      ref = getRef(firebaseApp)
    }
    watchList(ref, path)
    return () => unwatchList(path)
  }, [getRef, path, watchList, unwatchList, firebaseApp])

  const list = getList(path).map(({ key, val }) => {
    return { key, ...val }
  })

  return (
    <React.Fragment>
      <ListPage
        name={path}
        list={list}
        fields={fields}
        Row={Row}
        listProps={listProps}
        getPageProps={(list) => {
          return {
            isLoading: isListLoading(path),
            ...getPageProps(list),
          }
        }}
      />
      {isGranted(auth, createGrant) && (
        <Fab
          color="secondary"
          style={{
            position: 'absolute',
            bottom: 18,
            right: 18,
          }}
          onClick={onCreateClick}
        >
          <Add />
        </Fab>
      )}
    </React.Fragment>
  )
}

export default Page
