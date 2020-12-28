import * as types from './types'

const initialState = {
  source: 'light',
  isNightModeOn: false
}

const themeSource = (state = initialState, action) => {
  switch (action.type) {
  case types.UPDATE_THEME:
    return { ...state, source: action.theme }
  case types.SWITCH_NIGHT_MODE:
    return { ...state, isNightModeOn: action.isNightModeOn }
  default:
    return state
  }
}

export default themeSource
