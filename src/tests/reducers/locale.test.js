import reducer from '../../reducers/locale'
import {UPDATE_LOCALE} from '../../actions/locale'

describe('locale reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual('en')
  })

  it('should handle UPDATE_LOCALE', () => {
    expect(
      reducer('en', {
        type: UPDATE_LOCALE,
        locale: 'de'
      })
    ).toEqual('de')
  })


})
