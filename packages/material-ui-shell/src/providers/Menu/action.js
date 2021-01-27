const SET_IS_MINI_MODE = 'SET_IS_MINI_MODE'
const SET_IS_MENU_OPEN = 'SET_IS_MENU_OPEN'
const SET_IS_MINI_SWITCH_VISIBILITY = 'SET_IS_MINI_SWITCH_VISIBILITY' 

const setIsMiniMode = (dispatch, payload) => dispatch({ type:SET_IS_MINI_MODE, payload})
const setIsMenuOpen = (dispatch, payload) => dispatch({ type:SET_IS_MENU_OPEN, payload})
const setIsMiniSwitchVisibility = (dispatch, payload) => dispatch({ type:SET_IS_MINI_SWITCH_VISIBILITY, payload})

  const reducer = (state, action) => {
    const { type, payload } = action
  switch (type) {
    case SET_IS_MINI_MODE:
      return { ...state, isMiniMode: payload }
    case SET_IS_MENU_OPEN:
      return { ...state, isMenuOpen: payload }
    case SET_IS_MINI_SWITCH_VISIBILITY:
      return { ...state, isMiniSwitchVisibility: payload }
    default:
      return state
  }
} 
export {
  reducer,
  setIsMiniMode,
  setIsMenuOpen,
  setIsMiniSwitchVisibility
}