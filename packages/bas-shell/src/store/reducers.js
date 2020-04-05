import { combineReducers } from 'redux'
import initState from './init'
import rootReducer from './rootReducer'
import simpleValues from './simpleValues/reducer'

export const appReducers = { simpleValues }

const appReducer = combineReducers(appReducers)

export default (state, action) =>
  rootReducer(appReducer, initState, state, action)
