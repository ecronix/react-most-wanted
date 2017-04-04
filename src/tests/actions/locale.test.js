import * as actions from '../../actions/locale'

describe('locale actions', () => {
  it('should create an action to add a todo', () => {
    const locale = 'de'
    const expectedAction = {
      type: actions.UPDATE_LOCALE,
      locale
    }
    expect(actions.updateLocale(locale)).toEqual(expectedAction)
  })
})
