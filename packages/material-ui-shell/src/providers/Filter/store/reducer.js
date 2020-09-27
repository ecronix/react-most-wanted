import * as types from './types'

function query(query, action) {
  const { payload } = action

  switch (action.type) {
    case types.ON_ADD_FILTER_QUERY:
    case types.ON_EDIT_FILTER_QUERY:
      return { ...query, ...payload }

    default:
      return query
  }
}

function queries(queries = [], action) {
  const { index } = action

  switch (action.type) {
    case types.ON_ADD_FILTER_QUERY:
      return [...queries, query({}, action)]

    case types.ON_EDIT_FILTER_QUERY:
      return queries.map((q, i) => {
        if (index !== i) {
          return q
        }
        return query(q, action)
      })

    case types.ON_REMOVE_FILTER_QUERY:
      return queries.filter((item, i) => i !== index)

    default:
      return queries
  }
}

function search(search = {}, action) {
  const { payload } = action

  switch (action.type) {
    case types.ON_SET_SEARCH:
      return { ...search, value: payload }

    default:
      return search
  }
}

function filter(filter = {}, action) {
  const { payload } = action

  switch (action.type) {
    case types.ON_FILTER_IS_OPEN:
    case types.ON_FILTER_IS_CLOSE:
    case types.ON_FILTER_SORT_FIELD_CHANGED:
    case types.ON_FILTER_SORT_ORIENTATION_CHANGED:
      return { ...filter, ...payload }

    case types.ON_ADD_FILTER_QUERY:
    case types.ON_EDIT_FILTER_QUERY:
    case types.ON_REMOVE_FILTER_QUERY:
      return { ...filter, queries: queries(filter.queries, action) }

    case types.ON_SET_SEARCH:
      return { ...filter, search: search(filter.search, action) }

    case types.ON_CLEAR:
      return { fields: filter.fields }

    default:
      return filter
  }
}

export default function filters(state = {}, action) {
  const { name } = action
  switch (action.type) {
    case types.ON_FILTER_IS_OPEN:
    case types.ON_FILTER_IS_CLOSE:
    case types.ON_FILTER_SORT_FIELD_CHANGED:
    case types.ON_FILTER_SORT_ORIENTATION_CHANGED:
    case types.ON_ADD_FILTER_QUERY:
    case types.ON_EDIT_FILTER_QUERY:
    case types.ON_REMOVE_FILTER_QUERY:
    case types.ON_SET_SEARCH:
    case types.ON_CLEAR:
      return { ...state, [name]: filter(state[name], action) }
    default:
      return state
  }
}
