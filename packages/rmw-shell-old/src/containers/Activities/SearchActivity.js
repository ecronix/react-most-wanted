import Activity from 'rmw-shell/lib/containers/Activity'
import InputBase from '@material-ui/core/InputBase'
import List from '@material-ui/core/List'
import React, { useState, useEffect } from 'react'
import Scrollbar from 'rmw-shell/lib/components/Scrollbar'
import SearchIcon from '@material-ui/icons/Search'
import algoliasearch from 'algoliasearch/lite'
import { connectHits, connectSearchBox, InstantSearch } from 'react-instantsearch-dom'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { injectIntl } from 'react-intl'
import { withStyles } from '@material-ui/core/styles'
import { setSimpleValue } from 'rmw-shell/lib/store/simpleValues/actions'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

const getActions = dispatch => bindActionCreators({ setSimpleValue }, dispatch)
const PERSISTENT_SEARCH_VALUE_KEY = 'search_activity_value'

const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  }
})

let timerId = null
const MaterialUiSearchBox = ({ refine, delay, classes, intl, currentRefinement }) => {
  const [state, setState] = useState({
    value: currentRefinement
  })

  const initialValue = useSelector(state => state.simpleValues[PERSISTENT_SEARCH_VALUE_KEY])

  useEffect(() => {
    if (initialValue) {
      setState({ value: initialValue })
      onChangeDebounced(initialValue)
    }
  }, [])

  const { setSimpleValue } = getActions(useDispatch())

  const onChangeDebounced = value => {
    clearTimeout(timerId)
    timerId = setTimeout(() => refine(value), delay)

    setSimpleValue(PERSISTENT_SEARCH_VALUE_KEY, value)

    setState(() => ({
      value
    }))
  }

  const { value } = state

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        value={value}
        onChange={e => onChangeDebounced(e.currentTarget.value)}
        placeholder={intl.formatMessage({ id: 'search' })}
        id="SearchBox"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
      />
    </div>
  )
}

const ConnectedSearchBox = connectSearchBox(withStyles(styles)(injectIntl(MaterialUiSearchBox)))

let interval = null

const Search = ({ hitComponent, indexName, appID, apiKey }) => {
  const [state, setState] = useState({})

  useEffect(() => {
    interval = setInterval(
      () =>
        setState({ refresh: true }, () => {
          setState({ refresh: false })
        }),
      5000
    )

    return clearInterval(interval)
  }, [])

  const Hits = ({ hits }) => <List>{hits.map(hit => hitComponent({ hit }))}</List>
  const CustomHits = connectHits(Hits)

  const algoliaClient = algoliasearch(appID, apiKey)
  const searchClient = {
    search(requests) {
      if (requests.every(({ params }) => !params.query)) {
        return Promise.resolve({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            processingTimeMS: 0
          }))
        })
      }

      return algoliaClient.search(requests)
    }
  }

  return (
    <InstantSearch indexName={indexName} searchClient={searchClient}>
      <Activity appBarContent={<ConnectedSearchBox delay={500} refresh={state.refresh} />}>
        <div style={{ height: '100%' }}>
          <Scrollbar>
            <CustomHits />
          </Scrollbar>
        </div>
      </Activity>
    </InstantSearch>
  )
}

export default Search
