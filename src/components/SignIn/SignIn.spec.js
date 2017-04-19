import React from 'react';
import SignIn from './SignIn';
import { shallowWithIntlTheme } from '../../utils/intl-theme-test';


function setup() {
  const props = {
    updateAuth: jest.fn(),
    push: jest.fn(),
    setDrawerOpen: jest.fn(),
  }

  const wrapper = shallowWithIntlTheme(<SignIn {...props} />)

  return {
    props,
    wrapper
  }
}

describe('components', () => {
  describe('SignIn', () => {
    const { wrapper } = setup();

    it('renders without exploding', () => {
      expect(wrapper.length).toBe(1)
    })

    it('should be able to call updateAuth', () => {
      const { wrapper, props } = setup()
      props.updateAuth(true)
      expect(props.updateAuth.mock.calls.length).toBe(1)
    })

    it('should be able to call push', () => {
      const { wrapper, props } = setup()
      props.push(true)
      expect(props.push.mock.calls.length).toBe(1)
    })

    it('should be able to call setDrawerOpen', () => {
      const { wrapper, props } = setup()
      props.setDrawerOpen(true)
      expect(props.setDrawerOpen.mock.calls.length).toBe(1)
    })


  })
})
