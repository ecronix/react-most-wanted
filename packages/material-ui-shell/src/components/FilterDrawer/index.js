import Add from '@material-ui/icons/Add'
import AppBar from '@material-ui/core/AppBar'
import ClearAll from '@material-ui/icons/ClearAll'
import SortByAlpha from '@material-ui/icons/SortByAlpha'
import Close from '@material-ui/icons/Close'
import Delete from '@material-ui/icons/Delete'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Fab from '@material-ui/core/Fab'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import React from 'react'
import Select from '@material-ui/core/Select'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { useFilter } from 'material-ui-shell/lib/providers/Filter'
import { useIntl } from 'react-intl'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar'

export default function ({ name, width = 250, fields = [] }) {
  const intl = useIntl()
  const {
    isFilterOpen,
    closeFilter,
    clearFilter,
    getFilter,
    removeFilterQuery,
    editFilterQuery,
    addFilterQuery,
    setFilterSortField,
    setFilterSortOrientation,
    getField,
  } = useFilter()

  const { queries = [], sortField = '', sortOrientation = 1 } = getFilter(name)

  return (
    <div>
      <Drawer variant="persistent" anchor="right" open={isFilterOpen(name)}>
        <AppBar position="static">
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

        <div
          style={{
            width,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <div style={{ margin: 8, display: 'flex', flexDirection: 'row' }}>
            <FormControl variant="outlined" fullWidth style={{ padding: 1 }}>
              <Select
                value={sortField}
                onChange={(e) => {
                  setFilterSortField(name, e.target.value)
                }}
                displayEmpty
              >
                <MenuItem key={'none'} value={''}>
                  {intl.formatMessage({
                    id: 'none',
                    defaultMessage: 'None',
                  })}
                </MenuItem>
                {fields.map((f) => (
                  <MenuItem key={f.name} value={f.name}>
                    {intl.formatMessage({ id: f.label, defaultMessage: f.label })}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton
              color={sortOrientation === 1 ? 'primary' : 'secondary'}
              disabled={sortField === '' || !sortField}
              onClick={() =>
                setFilterSortOrientation(name, sortOrientation === 1 ? -1 : 1)
              }
            >
              <SortByAlpha />
            </IconButton>
          </div>

          <Divider />

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'nowrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 8,
            }}
          >
            <Typography variant="h6" color="inherit">
              {intl.formatMessage({ id: 'filter', defaultMessage: 'Filter' })}
            </Typography>
            <Fab
              size="small"
              onClick={() =>
                addFilterQuery(name, {
                  field: '',
                  operator: '=',
                  value: '',
                })
              }
              color="primary"
              aria-label="add"
            >
              <Add />
            </Fab>
          </div>
          <div style={{ height: '100%', flex: 1 }}>
            <Scrollbar>
              {queries.map((q, i) => {
                const field = getField(q.field, fields)

                return (
                  <div key={`${q.field}_${i}`} style={{ padding: 8 }}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      style={{ padding: 1 }}
                    >
                      <Select
                        value={q.field}
                        onChange={(e) => {
                          const { defaultOperator } = getField(
                            e.target.value,
                            fields
                          )

                          return editFilterQuery(name, i, {
                            ...q,
                            field: e.target.value,
                            operator: defaultOperator,
                          })
                        }}
                        displayEmpty
                      >
                        {fields.map((f) => (
                          <MenuItem key={f.name} value={f.name}>
                            {intl.formatMessage({ id: f.label, defaultMessage: f.label })}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      {field && (
                        <FormControl
                          variant="outlined"
                          style={{ padding: 1, minWidth: 100 }}
                        >
                          <Select
                            value={q.operator}
                            onChange={(e) =>
                              editFilterQuery(name, i, {
                                ...q,
                                operator: e.target.value,
                              })
                            }
                            displayEmpty
                          >
                            {field.operators.map((o) => (
                              <MenuItem key={o.value} value={o.value}>
                                {intl.formatMessage({ id: o.label, defaultMessage: o.label })}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                      <IconButton onClick={() => removeFilterQuery(name, i)}>
                        <Delete color="error" />
                      </IconButton>
                    </div>

                    {field &&
                      field.render(q, (changes) =>
                        editFilterQuery(name, i, { ...q, ...changes })
                      )}
                    <Divider style={{ marginTop: 6 }} />
                  </div>
                )
              })}
            </Scrollbar>
          </div>
        </div>
      </Drawer>
    </div>
  )
}
