import { combineReducers } from 'redux'
import initState from './init'
import rootReducer from './rootReducer'

export const appReducers = {}

const appReducer = combineReducers(appReducers)

export default (state, action) =>
  rootReducer(appReducer, initState, state, action)
