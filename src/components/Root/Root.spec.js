import React from 'react';
import Root from './Root';
import { shallowWithIntlTheme } from '../../utils/intl-theme-test';

function setup() {
  const props = {
    fetchUser: jest.fn(),
  }

  const wrapper = shallowWithIntlTheme(<Root {...props} />)

  return {
    props,
    wrapper
  }
}

describe('components', () => {
  describe('Root', () => {
    it('renders without exploding', () => {
      const { wrapper, props } = setup();
      expect(wrapper.length).toBe(1);
    })

    it('fetchUser should be called', () => {
      const { wrapper, props } = setup();
      //props.fetchUser(true)
      expect(props.fetchUser.mock.calls.length).toBe(1)
    })

  })
})
