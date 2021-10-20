import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import SearchBar from './SearchBar'
import { withFirebase } from 'firekit-provider'
import { Divider, List, ListItem, ListItemText } from '@material-ui/core'
import Scrollbar from 'rmw-shell/lib/components/Scrollbar'

const Search = ({ firebaseApp }) => {
  const intl = useIntl()
  const [list, setList] = useState([])
  const [isLoading, setLoading] = useState(false)

  const handleSearch = async (value = '', date = '04.06.2021') => {
    setLoading(true)

    let ref = await firebaseApp
      .firestore()
      .collection('container_tasks')
      .orderBy('search')

    try {
      if (value !== '') {
        ref = ref.where('search', 'array-contains-any', [value.toLowerCase()])
      }

      if (date !== '') {
        ref = ref.where('date', '==', date)
      }

      const snap = await ref.limitToLast(20).get()

      const l = []

      snap.forEach((doc) => {
        l.push({ id: doc.id, ...doc.data() })
      })

      setList(l)
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page
      isLoading={isLoading}
      title={intl.formatMessage({ id: 'search' })}
      appBarContent={
        <SearchBar handleSearch={handleSearch} isLoading={isLoading} />
      }
    >
      <Scrollbar>
        <List>
          {list.map((i) => {
            const { data = {}, date = '' } = i || {}
            const {
              cmr = '',
              customerLabel = '',
              refNr = '',
              conNr = '',
              terminalUid = '',
              statusUid = '',
              driverLabel = '',
              vehicleLabel = '',
              exportNr = '',
            } = data || {}

            return (
              <div key={i.id}>
                <ListItem
                  button
                  onClick={() => {
                    const win = window.open(
                      `${document.location.origin}/container_tasks/${terminalUid}/${statusUid}/edit/${i.id}`,
                      '_blank'
                    )
                    win.focus()
                  }}
                >
                  <ListItemText
                    primary={cmr}
                    secondary={customerLabel}
                    style={{ maxWidth: 200 }}
                  />
                  <ListItemText
                    primary={date}
                    secondary={exportNr}
                    style={{ maxWidth: 200 }}
                  />
                  <ListItemText
                    primary={refNr}
                    secondary={conNr}
                    style={{ maxWidth: 200 }}
                  />
                  <ListItemText
                    primary={driverLabel}
                    secondary={vehicleLabel}
                    style={{ maxWidth: 200 }}
                  />
                </ListItem>
                <Divider />
              </div>
            )
          })}
        </List>
      </Scrollbar>
    </Page>
  )
}

export default withFirebase(Search)
