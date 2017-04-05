import reducer from '../../reducers/locale'
import {UPDATE_LOCALE, updateLocale} from '../../actions/locale'

describe('locale reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual('en')
  }) 

  it('should handle UPDATE_LOCALE', () => {
    expect(
      reducer('en', updateLocale('de'))
    ).toEqual('de')
  })


})
