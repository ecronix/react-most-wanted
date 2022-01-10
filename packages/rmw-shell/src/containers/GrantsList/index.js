import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import React, { useEffect } from 'react'
import VirtualList from 'material-ui-shell/lib/containers/VirtualList'
import { useConfig } from 'base-shell/lib/providers/Config'
import { useFilter } from 'material-ui-shell/lib/providers/Filter'
import { useLists } from '../../providers/Firebase/Lists'
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
