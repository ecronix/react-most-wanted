import React from 'react';
import {AppTest} from './App';
import { shallowWithIntlTheme } from '../../utils/intl-theme-test';

function setup() {
  const props = {
    auth: {isSignedIn: false},
  }

  const wrapper = shallowWithIntlTheme(<AppTest {...props} />)

  return {
    props,
    wrapper
  }
}

describe('components', () => {
  describe('App', () => {
    it('renders without exploding', () => {
      const { wrapper, props } = setup();
      expect(wrapper.length).toBe(1);
    })
  })
})
