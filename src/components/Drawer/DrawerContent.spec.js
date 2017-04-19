import React from 'react';
import DrawerContent  from './DrawerContent';
import { shallowWithIntlTheme } from '../../utils/intl-theme-test';


function setup() {
  const props = {
    setResponsive: jest.fn(),
    setDrawerOpen: jest.fn(),
    updateLocale: jest.fn(),
  }

  const wrapper = shallowWithIntlTheme(<DrawerContent {...props} />)

  return {
    props,
    wrapper
  }
}

describe('components', () => {
  describe('DrawerContent', () => {
    const { wrapper } = setup();

    it('renders without exploding', () => {
      expect(wrapper.length).toBe(1)
    })

    it('should be able to call setResponsive', () => {
      const { wrapper, props } = setup()
      props.setResponsive(true)
      expect(props.setResponsive.mock.calls.length).toBe(1)
    })

    it('should be able to call setDrawerOpen', () => {
      const { wrapper, props } = setup()
      props.setDrawerOpen(true)
      expect(props.setDrawerOpen.mock.calls.length).toBe(1)
    })

    it('should be able to call updateLocale', () => {
      const { wrapper, props } = setup()
      props.updateLocale(true)
      expect(props.updateLocale.mock.calls.length).toBe(1)
    })


  })
})
