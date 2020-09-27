import Drawer from '@material-ui/core/Drawer'
import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Close from '@material-ui/icons/Close'
import ClearAll from '@material-ui/icons/ClearAll'
import { useIntl } from 'react-intl'
import { useFilter } from 'material-ui-shell/lib/providers/Filter'
import { Button, TextField } from '@material-ui/core'

export default function ({ name, width = 250, fields = [] }) {
  const theme = useTheme()
  const intl = useIntl()
  const {
    isFilterOpen,
    closeFilter,
    clearFilter,
    getFilterQueries,
    removeFilterQuery,
    editFilterQuery,
    addFilterQuery,
  } = useFilter()

  const queries = getFilterQueries(name)

  return (
    <Drawer
      style={{ zIndex: theme.zIndex.modal + 2 }}
      variant="persistent"
      anchor="right"
      open={isFilterOpen(name)}
    >
      <AppBar position="static" style={{ zIndex: theme.zIndex.modal + 20 }}>
        <Toolbar disableGutters>
          <IconButton color="inherit" onClick={() => closeFilter(name)}>
            <Close />
          </IconButton>
          <Typography variant="h6" color="inherit">
            {intl.formatMessage({ id: 'filter', defaultMessage: 'Filter' })}
          </Typography>
          <div style={{ flex: 1 }} />
          <IconButton color="inherit" onClick={() => clearFilter(name)}>
            <ClearAll />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div style={{ width }}>
        <Button
          onClick={() =>
            addFilterQuery(name, {
              field: 'number1',
              operator: '=',
              value: 0,
            })
          }
        >
          Add
        </Button>
        {queries.map((q, i) => {
          const field = fields.find((f) => f.name == q.field)

          return (
            <div>
              {q.field}
              <br />
              {field.render(q.value, (value) =>
                editFilterQuery(name, i, { ...q, value })
              )}

              <br />
              <Button onClick={() => removeFilterQuery(name, i)}>Close</Button>
            </div>
          )
        })}
      </div>
    </Drawer>
  )
}
