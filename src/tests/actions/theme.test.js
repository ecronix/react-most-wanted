import * as actions from '../../actions/theme'

describe('theme actions', () => {
  it('should create an action to add a todo', () => {
    const theme = 'de'
    const expectedAction = {
      type: actions.UPDATE_THEME,
      theme
    }
    expect(actions.updateTheme(theme)).toEqual(expectedAction)
  })
})
