import Checkbox from '@material-ui/core/Checkbox'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import React, { useEffect } from 'react'
import VirtualList from 'material-ui-shell/lib/containers/VirtualList'
import { useConfig } from 'base-shell/lib/providers/Config'
import { useFilter } from 'material-ui-shell/lib/providers/Filter'
import { useLists } from 'rmw-shell/lib/providers/Firebase/Lists'
import { getDatabase, ref, set } from 'firebase/database'

export default function ({ grantsPath }) {
  const { appConfig } = useConfig()
  const { auth: authConfig } = appConfig || {}
  const { grants = [] } = authConfig || {}
  const { watchList, getList: getFirebaseList } = useLists()
  const { getList } = useFilter()
  const db = getDatabase()

  const roleGrants = getFirebaseList(grantsPath)

  const list = getList(
    'grants',
    grants.map((g) => {
      return { name: g }
    }),
    [{ name: 'name' }]
  )

  useEffect(() => {
    watchList(grantsPath)
  }, [grantsPath, watchList])

  const Row = ({ index, style, data }) => {
    const { name } = data

    let isSelected = false

    roleGrants.map((rg) => {
      if (rg.key === name) {
        isSelected = true
      }

      return rg
    })

    return (
      <div key={`${name}_${index}`} style={style}>
        <ListItem
          button
          alignItems="flex-start"
          onClick={async () => {
            await set(
              ref(db, `${grantsPath}/${name}`),
              isSelected ? null : true
            )
          }}
        >
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={isSelected}
              tabIndex={-1}
              disableRipple
            />
          </ListItemIcon>
          <ListItemText primary={name} secondary={name} />
        </ListItem>
        <Divider />
      </div>
    )
  }

  return (
    <VirtualList
      list={list}
      name="grants"
      listProps={{ itemSize: 72 }}
      Row={Row}
    />
  )
}
