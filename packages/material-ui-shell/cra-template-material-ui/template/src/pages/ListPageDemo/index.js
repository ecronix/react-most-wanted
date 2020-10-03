import React, { useEffect, useState } from 'react'
import { ListPage } from 'material-ui-shell/lib/containers/Page'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { useIntl } from 'react-intl'
import { useFilter } from 'material-ui-shell/lib/providers/Filter'

import list from './data.json'

const fields = [
  {
    name: 'name',
    label: 'Name',
  },
  {
    name: 'email',
    label: 'E-Mail',
  },
  {
    name: 'amount',
    label: 'Amount',
    type: 'number',
  },
  {
    name: 'isActive',
    label: 'Aktive',
    type: 'bool',
  },
  {
    name: 'registered',
    label: 'Registered',
    type: 'date',
  },
  {
    name: 'registrationTime',
    label: 'Registration time',
    type: 'time',
  },
]

export default function () {
  const intl = useIntl()

  const Row = ({ index, style }) => {
    const { name, amount = '', registered, email } = list[index]

    return (
      <div key={`${name}_${index}`} style={style}>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={`${name} ${index}`}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textSecondary"
                >
                  {email}
                </Typography>
                <br />
                <Typography
                  component="span"
                  variant="body2"
                  color="textSecondary"
                >
                  {`${amount} ${registered}`}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider />
      </div>
    )
  }

  return (
    <ListPage
      name="list_demo"
      list={list}
      fields={fields}
      Row={Row}
      listProps={{ itemSize: 91 }}
      getPageProps={(list) => {
        return {
          pageTitle: intl.formatMessage(
            {
              id: 'list_page_demo',
              defaultMessage: 'List Page demo with {count} rows',
            },
            { count: list.length }
          ),
        }
      }}
    />
  )
}
