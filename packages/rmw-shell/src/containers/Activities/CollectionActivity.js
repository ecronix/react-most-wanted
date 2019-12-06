import Activity from '../../containers/Activity'
import Add from '@material-ui/icons/Add'
import FilterList from '@material-ui/icons/FilterList'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactList from 'react-list'
import Scrollbar from '../../components/Scrollbar'
import SearchField from '../../components/SearchField'
import Tooltip from '@material-ui/core/Tooltip'
import isGranted from '../../utils/auth'
import { Fab } from '@material-ui/core'
import { FilterDrawer, filterSelectors, filterActions } from 'material-ui-filter'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getCol } from 'firekit'
import { injectIntl } from 'react-intl'
import { withFirebase } from 'firekit-provider'
import { withRouter } from 'react-router-dom'

class CollectionActivity extends Component {
  componentDidMount() {
    const { path, name, watchCol } = this.props

    watchCol(path || name)
  }

  componentWillUnmount() {
    const { unwatchCol, path, name } = this.props
    unwatchCol(path || name)
  }

  render() {
    const {
      createGrant,
      filterFields,
      hasFilters,
      history,
      intl,
      isGranted,
      list,
      name,
      setFilterIsOpen,
      renderItem,
      handleCreateClick,
      disableCreate,
      title
    } = this.props

    const fields = filterFields.map(field => {
      if (!field.label) {
        return {
          label: intl.formatMessage({ id: `${field.name}_label` }),
          ...field
        }
      }
      return field
    })

    return (
      <Activity
        title={title ? title : intl.formatMessage({ id: name })}
        appBarContent={
          <div style={{ display: 'flex' }}>
            <SearchField filterName={name} />
            <Tooltip title={intl.formatMessage({ id: 'open_filter' })}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => {
                  setFilterIsOpen(name, true)
                }}
              >
                <FilterList color={hasFilters ? 'secondary' : 'inherit'} />
              </IconButton>
            </Tooltip>
          </div>
        }
      >
        <div style={{ height: '100%' }}>
          <Scrollbar>
            <List ref={field => (this.list = field)}>
              <ReactList
                itemRenderer={i => renderItem(list[i].id, list[i].data)}
                length={list ? list.length : 0}
                type="simple"
              />
            </List>
          </Scrollbar>
          <div style={{ float: 'left', clear: 'both' }} />
          {disableCreate !== true && isGranted(createGrant) && (
            <Fab
              onClick={
                handleCreateClick
                  ? handleCreateClick
                  : () => {
                    history.push(`/${name}/create`)
                  }
              }
              style={{ position: 'fixed', bottom: 15, right: 20, zIndex: 99 }}
              color={'secondary'}
            >
              <Add />
            </Fab>
          )}
        </div>
        <FilterDrawer name={name} fields={fields} formatMessage={intl.formatMessage} />
      </Activity>
    )
  }
}

CollectionActivity.propTypes = {
  isGranted: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const { filters } = state
  const { name, path, isGranted: customIsGranted } = ownProps

  const key = path ? path : name

  const { hasFilters } = filterSelectors.selectFilterProps(name, filters)
  const list = filterSelectors.getFilteredList(key, filters, getCol(state, key), fieldValue => fieldValue.data)

  return {
    hasFilters,
    list,
    isGranted: grant => (customIsGranted ? customIsGranted(state, grant) : isGranted(state, grant))
  }
}

export default compose(
  connect(
    mapStateToProps,
    { ...filterActions }
  ),
  injectIntl,
  withFirebase,
  withRouter
)(CollectionActivity)
