import expect from 'expect'
import reducer from './reducer'
import * as actions from './actions'

const initialState = {
}

describe('locale reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState)
  })

  it('should not affect state', () => {
    expect(
      reducer(initialState, { type: 'NOT_EXISTING' })
    ).toEqual(initialState)
  })

  it('should handle setFilterIsOpen', () => {
    expect(
      reducer(initialState, actions.setFilterIsOpen('demo', true))
    ).toEqual({ ...initialState, ...{ demo: { isOpen: true } } })
  })

  it('should handle setFilterSortOrientation', () => {
    expect(
      reducer(initialState, actions.setFilterSortOrientation('demo', true))
    ).toEqual({ ...initialState, ...{ demo: { sortOrientation: true } } })
  })

  it('should handle setFilterSortField', () => {
    expect(
      reducer(initialState, actions.setFilterSortField('demo', 'test'))
    ).toEqual({ ...initialState, ...{ demo: { sortField: 'test' } } })
  })

  it('should handle addFilterQuery', () => {
    expect(
      reducer(initialState, actions.addFilterQuery('demo', { field: 'test' }))
    ).toEqual({ ...initialState, ...{ demo: { queries: [{ field: 'test' }] } } })
  })

  it('should handle editFilterQuery', () => {
    expect(
      reducer({ demo: { queries: [{ field: 'test' }, { field: 'test3' }] } }, actions.editFilterQuery('demo', 0, { field: 'test2' }))
    ).toEqual({ ...initialState, ...{ demo: { queries: [{ field: 'test2' }, { field: 'test3' }] } } })
  })

  it('should handle removeFilterQuery', () => {
    expect(
      reducer({ demo: { queries: [{ field: 'test' }, { field: 'test3' }] } }, actions.removeFilterQuery('demo', 0))
    ).toEqual({ ...initialState, ...{ demo: { queries: [{ field: 'test3' }] } } })
  })
})
