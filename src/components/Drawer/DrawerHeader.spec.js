import React from 'react';
import DrawerHeader from './DrawerHeader';
import { shallowWithIntlTheme } from '../../helpers/intl-theme-test';

function setup() {
  const props = {
    setAuthMenuOpen: jest.fn(),
    auth: {isSignedIn: false}
  }

  const wrapper = shallowWithIntlTheme(<DrawerHeader {...props} />)

  return {
    props,
    wrapper
  }
}

describe('components', () => {
  describe('DrawerHeader', () => {
    it('renders without exploding', () => {
      const { wrapper } = setup()
      expect(wrapper.length).toBe(1)
    })
  })

  it('should be able to call setAuthMenuOpen', () => {
    const { wrapper, props } = setup()
    props.setAuthMenuOpen(true)
    expect(props.setAuthMenuOpen.mock.calls.length).toBe(1)
  })


})
