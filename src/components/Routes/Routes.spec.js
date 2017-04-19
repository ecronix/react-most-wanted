import React from 'react';
import Routes from './Routes';
import { shallowWithIntlTheme } from '../../utils/intl-theme-test';

const wrapper=shallowWithIntlTheme(<Routes/>)

function setup() {
  const props = {
    auth: {isSignedIn: false}
  }

  const wrapper = shallowWithIntlTheme(<Routes {...props} />)

  return {
    props,
    wrapper
  }
}

describe('components', () => {
  describe('Routes', () => {


    it('renders without exploding', () => {
      const { wrapper, props } = setup();
      expect(wrapper.length).toBe(1)
    })

  })
})
