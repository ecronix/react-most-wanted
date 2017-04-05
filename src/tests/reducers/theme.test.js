import reducer from '../../reducers/theme'
import {UPDATE_THEME, updateTheme} from '../../actions/theme'

describe('theme reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual('light')
  })

  it('should handle UPDATE_THEME', () => {
    expect(
      reducer('light', updateTheme('dark'))
    ).toEqual('dark')
  })


})
