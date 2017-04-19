import React from 'react';
import DrawerHeaderTest from './DrawerHeader';
import { shallowWithIntlTheme } from '../../utils/intl-theme-test';
import {injectIntl} from 'react-intl';

function setup() {
  const props = {
    setAuthMenuOpen: jest.fn(),
    auth: {isSignedIn: false}
  }

  const wrapper = shallowWithIntlTheme(<DrawerHeaderTest {...props} />)

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
