import { combineReducers } from 'redux'
import initState from './init'
import rootReducer from './rootReducer'
import simpleValues from './simpleValues/reducer'
import locale from './locale/reducer'

export const appReducers = { simpleValues, locale, }

const appReducer = combineReducers(appReducers)

export default (state, action) =>
  rootReducer(appReducer, initState, state, action)
