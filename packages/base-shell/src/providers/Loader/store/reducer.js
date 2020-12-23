import * as types from './types'

/* eslint-disable */

function loader(loader = {}, action) {
  const { payload } = action

  switch (action.type) {
    case types.LOADING:
    case types.LOADED:
    case types.LOADING_WITH_ERROR:
    case types.LOADED_WITH_ERROR:
      return { ...loader, ...payload }
    default:
      return loader
  }
}

export default function loaders(state = {}, action) {
  const { name } = action
  switch (action.type) {
    case types.LOADING:
      return { ...state, loadingPool: ++state.loadingPool, [name]: loader(state[name], action) }
    case types.LOADED:
      return { ...state, loadingPool: --state.loadingPool, [name]: loader(state[name], action) }
    case types.LOADING_WITH_ERROR:
      return { ...state, [name]: loader(state[name], action) }
    case types.LOADED_WITH_ERROR:
      return { ...state, loadingPool: --state.loadingPool, [name]: loader(state[name], action) }
    default:
      return state
  }
}

/* eslint-enable */
