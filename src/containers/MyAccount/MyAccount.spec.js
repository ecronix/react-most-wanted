import React from 'react';
import {MyAccountTest} from './MyAccount';
import {shallowWithIntlTheme} from '../../utils/intl-theme-test';

function setup() {
  const props = {
    auth: {},
  }

  const wrapper = shallowWithIntlTheme(<MyAccountTest {...props} />)

  return {
    props,
    wrapper
  }
}

describe('components', () => {
  describe('MyAccount', () => {
    it('renders without exploding', () => {
      const { wrapper, props } = setup()
      expect(wrapper.length).toBe(1)
    })
  })
})
