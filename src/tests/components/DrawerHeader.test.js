import React from 'react';
import { DrawerHeader } from '../../components/Drawer';
import { shallowWithIntlTheme } from '../../helpers/intl-theme-test';

function setup() {
  const props = {
    updateAuth: jest.fn(),
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

  it('should be able to call updateAuth', () => {
    const { wrapper, props } = setup()
    props.updateAuth(true)
    expect(props.updateAuth.mock.calls.length).toBe(1)
  })


})
